import React from 'react';
// import { isDesktop } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { selectMember } from '_redux/member/selector';
import { useIsHistoryBack } from 'hooks/useIsHistoryBack';
import { messageMixpanel } from 'hooks/useWebviewBridge';
import { getCharacterProfile, CharacterProfile } from 'services/character';
import BackHeader from 'components/common/header/BackHeader';
import PageLoading from 'components/common/fallback/PageLoading';
// import { selectRefreshToken } from '_redux/refreshToken/selector';
// import { messageMixpanel } from 'hooks/useWebviewBridge';
import ErrorFallback from 'components/error/ErrorFallback';

// lazy 컴포넌트
const ProfileContent = React.lazy(() => import('components/character/profile/Content'));
const ProfileBottom = React.lazy(() => import('components/character/profile/Bottom'));
const IconHistory = React.lazy(() => import('icon/object/History'));

const Profile = () => {

    const { characterSe } = useParams();
    const navigate = useNavigate();
    const { se } = useSelector(selectMember);
    // const token = useSelector(selectRefreshToken);
    // const [ , startTransition ] = React.useTransition();
    // const [ profile, setProfile ] = React.useState<CharacterProfile | null>(null);

    const isBackAccess = useIsHistoryBack();

    const INDEX_KEY: QueryKey = ['characters-profile', characterSe];

    const { data: profile, isLoading, isFetching, error, refetch } = useQuery({
        queryKey: INDEX_KEY,
        queryFn: () => getCharacterProfile(se!, characterSe),
        enabled: false,
        // staleTime: 1000 * 60 * 1 // 1분
    });

    React.useEffect(() => {

        if (!isBackAccess.current) { // 뒤로가기로 접근할 경우는 제외
            refetch();
        }
    }, [])

    
    React.useEffect(() => {
        if (!profile) return;

        messageMixpanel({
            tracking_type: 'event',
            event_name: 'view_character_profile',
            param: {
                'persona': profile.character_nm,
            }
        })
    }, [profile])


    // React.useEffect(() => {
    //     if (!se) return;

        // const getCharacterProfileFetch = async () => {
        //     const res = await getCharacterProfile(se, Number(characterSe));
        //     if (res) {
        //         // console.log('프로필', res)
        //         setProfile(res);

        //         messageMixpanel({
        //             tracking_type: 'event',
        //             event_name: 'view_character_profile',
        //             param: {
        //                 'persona': res.character_nm,
        //             }
        //         })
        //     }
        // }

    //     startTransition(() => {
    //         getCharacterProfileFetch();
    //     })

    // }, [token])

    if (error) {
        return <ErrorFallback error={ error } />
    }

    if (isLoading || isFetching || !profile) {
        return <PageLoading />
    }

    return (
        <div className='characer-profile-page relative max-w-desktop'>
            <BackHeader
                isWebview={ true }
                iconColor='#fff'
                rightIcon={ <React.Suspense><IconHistory location='프로필' /></React.Suspense> }
            />
            {/* <div
                className={`
                    back-bg-layer absolute top-0 z-[1] h-full bg-black bg-opacity-30 cursor-pointer
                    ${isDesktop ? 'w-desktop' : 'w-full max-w-desktop'}
                `}
                // onClick={ onClickBackImgHandle }
            ></div> */}
            <div className='bg-image absolute w-full h-full top-0 left-0'>
                <img
                    src={ process.env.REACT_APP_IMAGE_URL + profile.backgroud_lk }
                    alt="bg"
                    width={360}
                    height={550}
                    className='h-full object-cover'
                    loading='lazy'
                />
            </div>
            <div className='content flex flex-col h-viewScreen'>
                <React.Suspense fallback={ <PageLoading /> }><ProfileContent profile={ profile } /></React.Suspense>
                <React.Suspense fallback={ <PageLoading /> }><ProfileBottom profile={ profile } /></React.Suspense>
            </div>
        </div>
    )
}

export default Profile