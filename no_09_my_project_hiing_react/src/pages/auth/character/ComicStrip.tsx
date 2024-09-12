import React from 'react'
import { useParams } from 'react-router-dom';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { messageMixpanel } from 'hooks/useWebviewBridge';
import { CharacterComicStripClass, getCharacterComicStrip } from 'services/character'
import BackHeader from 'components/common/header/BackHeader';
// import { selectRefreshToken } from '_redux/refreshToken/selector';
// import { useSelector } from 'react-redux';
import ErrorFallback from 'components/error/ErrorFallback';
import PageLoading from 'components/common/fallback/PageLoading';

const ComicStrip = () => {
    const { characterSe } = useParams();
    // const token = useSelector(selectRefreshToken);
    // const [ , startTransition ] = React.useTransition();
    // const [ comicStrip, setComicStrip ] = React.useState<CharacterComicStripClass  | null>(null);
    
    const INDEX_KEY: QueryKey = ['characters-comic-strip', characterSe];

    const { data: comicStrip, isLoading, isFetching, error } = useQuery({
        queryKey: INDEX_KEY,
        queryFn: () => getCharacterComicStrip(characterSe),
        staleTime: Infinity // 무한대
    });


    React.useEffect(() => {
        if (!comicStrip) return;

        messageMixpanel({
            tracking_type: 'event',
            event_name: 'view_cartoon',
            param: {
                'persona': comicStrip.character_se === 1 ? '하나' : '포그니'
            }
        });
    }, [comicStrip])


    // React.useEffect(() => {
    //     if (!characterSe) return;

    //     const getComicStrip = async () => {
    //         const res = await getCharacterComicStrip(characterSe);
    //         if (res) {
    //             setComicStrip(res);

    //             messageMixpanel({
    //                 tracking_type: 'event',
    //                 event_name: 'view_cartoon',
    //                 param: {
    //                     'persona': res.character_se === 1 ? '하나' : '포그니'
    //                 }
    //             });
    //         }
    //     }

    //     startTransition(() => {
    //         getComicStrip();
    //     })
    // }, [token])
    
    if (error) {
        return <ErrorFallback error={ error } />
    }

    if (isLoading || isFetching || !comicStrip) {
        return <PageLoading />
    }
    
    
    return (
        <div className='comic-strip-page bg-white'>
            <BackHeader />
            <React.Fragment>
                <div className="title-image w-[200px] mx-auto pt-4">
                    <img
                        src={ comicStrip.comic_strip_tt_lk }
                        alt="title"
                        width={200}
                        height={110}
                        loading='lazy'
                    />
                </div>
                <div className='w-[332px] mx-auto py-3.5'>
                    <img
                        src={ comicStrip.comic_strip_lk } 
                        alt="img"
                        width={332}
                        loading='lazy'
                    />
                </div>
            </React.Fragment>
        </div>
    )
}

export default ComicStrip