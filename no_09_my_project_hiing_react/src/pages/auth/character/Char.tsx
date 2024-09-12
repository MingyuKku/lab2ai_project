import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { isDesktop } from 'react-device-detect';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { messageMixpanel } from 'hooks/useWebviewBridge';
import { CharacterInfoClass, getCharacterInfo } from 'services/character';
import BackHeader from 'components/common/header/BackHeader';
import CharacterInfo from 'components/character/Info';
import { selectRefreshToken } from '_redux/refreshToken/selector';
import PageLoading from 'components/common/fallback/PageLoading';
import ErrorFallback from 'components/error/ErrorFallback';

const Char = () => {

    const { characterSe } = useParams();
    // const token = useSelector(selectRefreshToken);
    // const [ , startTransition ] = React.useTransition();
    // const [ characterContent, setCharacterContent ] = React.useState<CharacterInfoClass  | null>(null);

    const INDEX_KEY: QueryKey = ['characters-infomation', characterSe];

    const { data: characterInfo, isLoading, isFetching, error } = useQuery({
        queryKey: INDEX_KEY,
        queryFn: () => getCharacterInfo(characterSe),
        staleTime: Infinity // 무한대
    })

    React.useEffect(() => {
        if (!characterInfo) return;

        messageMixpanel({
            tracking_type: 'event',
            event_name: 'view_explanation',
            param: {
                'persona': characterInfo.character_nm
            }
        });
    }, [characterInfo])

    // React.useEffect(() => {
    //     if (characterSe) {
    //         const getCharacterInfoFetch = async () => {
    //             const res = await getCharacterInfo(characterSe);
    //             // console.log('응답', res)
    //             if (res) {
    //                 setCharacterContent(res);

    //                 messageMixpanel({
    //                     tracking_type: 'event',
    //                     event_name: 'view_explanation',
    //                     param: {
    //                         'persona': res.character_nm
    //                     }
    //                 });
    //             }
    //         }

    //         startTransition(() => {
    //             getCharacterInfoFetch();
    //         })
            
    //     }
    // }, [token])


    const onClickComicStrip = React.useCallback((character_nm: string) => {
        return () => {
            messageMixpanel({
                tracking_type: 'event',
                event_name: 'click_cartoon',
                param: {
                    'persona': character_nm
                }
            });
        }
    }, [])


    if (error) {
        return <ErrorFallback error={ error } />
    }

    if (isLoading || isFetching || !characterInfo) {
        return <PageLoading />
    }


    return (
        <div className='w-full min-h-viewScreen bg-white'>
            <BackHeader isWebview={ true } />
            <div className="content relative overflow-hidden">
                <div className="image relative z-[1] w-[300px] mx-auto">
                    <img
                        src={ characterInfo.info_lk }
                        alt="img"
                        width={300} height={300}
                        loading='lazy'
                    />
                </div>
                <div className="bg-img absolute top-0 x-center w-[180%]">
                    <img
                        src={characterInfo.info_background_lk}
                        alt="bg"
                        width={360}
                        height={100}
                        loading='lazy'
                    />
                </div>
                <CharacterInfo
                    item={ characterInfo }
                />
            </div>
            <div
                className={`
                    fixed bottom-0 bg-white p-3.5
                    ${isDesktop ? 'w-desktop' : 'w-full max-w-desktop'}
                `}
            >
                <Link
                    to={`/character/${characterInfo.character_se}/comic_strip`}
                    onClick={ onClickComicStrip(characterInfo.character_nm) }
                    className='flex justify-center items-center border-[1px] border-[#FF763B] rounded-full h-9'
                >
                    <div className='font-pretendard font-medium text-[15px] text-primary-01'>{ characterInfo.character_nm } 네컷만화 보기</div>
                </Link>
            </div>
        </div>
    )
}

export default Char;