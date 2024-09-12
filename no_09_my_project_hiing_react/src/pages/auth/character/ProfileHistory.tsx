import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { CharacterHistoryClass, CharacterStateHistoryClass, getCharacterProfileHistory } from 'services/character';
import { selectRefreshToken } from '_redux/refreshToken/selector';
import { messageMixpanel } from 'hooks/useWebviewBridge';
import BackHeader from 'components/common/header/BackHeader';
import ErrorFallback from 'components/error/ErrorFallback';
import PageLoading from 'components/common/fallback/PageLoading';

const HistoryItem = React.lazy(() => import('components/character/profile/HistoryItem'));

const ProfileHistory = () => {

    const { characterSe } = useParams();
    const [ searchParam ] = useSearchParams();
    // const token = useSelector(selectRefreshToken);
    // const { refreshRendering } = useWebviewBridge();
    // const [ history, setHistory ] = React.useState<CharacterHistoryClass | null>(null);
    const [ recentProfile, setRecentProfile ] = React.useState<CharacterStateHistoryClass | null>(null);

    const INDEX_KEY: QueryKey = ['characters-profile-history', characterSe];

    const { data: historyItems, isLoading, isFetching, error } = useQuery({
        queryKey: INDEX_KEY,
        queryFn: () => getCharacterProfileHistory(characterSe),
        staleTime: 1000 * 60 * 1 // 1분
    });


    React.useEffect(() => {
        if (!historyItems) return;

        const recentProfileItem = historyItems.historyItem.find(item => item.type_cd === 1);
        if (recentProfileItem) setRecentProfile(recentProfileItem);

        messageMixpanel({
            tracking_type: 'event',
            event_name: 'view_profile_history',
            param: {
                'location': searchParam.get('before_location') ?? ''
            }
        })

    }, [historyItems])

    // React.useEffect(() => {
    //     if (!characterSe) return;

    //     const fetchProfileHistory = async () => {
    //         const res = await getCharacterProfileHistory(characterSe);
    //         if (res) {
    //             const recentProfileItem = res.historyItem.find(item => item.type_cd === 1);
    //             setHistory(res);
    //             if (recentProfileItem) setRecentProfile(recentProfileItem);

    //             messageMixpanel({
    //                 tracking_type: 'event',
    //                 event_name: 'view_profile_history',
    //                 param: {
    //                     'location': searchParam.get('before_location') ?? ''
    //                 }
    //             })
    //         }
    //     }
    //     fetchProfileHistory();

    // }, [token])


    if (error) {
        return <ErrorFallback error={ error } />
    }

    if (isLoading || isFetching || !historyItems) {
        return <PageLoading />
    }

    
    return (
        <div className='characer-profile-history-page max-w-desktop pt-basic-header bg-[#F4F4F4]'>
            <BackHeader title={ historyItems?.character_nm ? `${historyItems?.character_nm}의 서랍장` : null } className='bg-white' />
            <ul>
                {
                    historyItems?.historyItem.map((history,idx) => (
                        <React.Suspense key={ idx }><HistoryItem item={ history } profile={ recentProfile } /></React.Suspense>
                    ))
                }
            </ul>
        </div>
    )
}

export default ProfileHistory;