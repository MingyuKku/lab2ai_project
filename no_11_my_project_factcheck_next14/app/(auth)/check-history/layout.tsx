'use client'

import React from 'react';
import { NextPage } from 'next';
import useSWR from 'swr';
import Filters from '@/containers/check-history/Filters';
import TableHead from '@/containers/check-history/Table-head';
import TableBody from '@/containers/check-history/Table-body';
import RequestCheckButton from '@/containers/check-history/Request-check-button';
import { useFetchCheckHistory } from '@/services/check-history/use-fetch-check-history';
import { GET_CHECK_HISTORY_LIST } from '@/lib/swr/keys';
import CheckHistoryItemProvider from '@/context/Check-history-item-provider';
import CommonLoader from '@/components/fallback/Loader';


interface Props {
    children: React.ReactNode;
}


const CheckHistoryLayout: NextPage<Props> = ({ children }) => {

    const { getList } = useFetchCheckHistory();
    const { data, error, isLoading, isValidating } = useSWR(GET_CHECK_HISTORY_LIST, getList, {
        revalidateOnFocus: true,
        // refreshInterval: 1000 * 60,
    })


    if (error) {
        return <p>에러 발생!</p>
    }
    
    return (
        <div className='px-side py-10'>
            <div className="head">
                <h1 className='title-lg text-center'>체크 히스토리</h1>
                <RequestCheckButton />
            </div>
            <div className='content-wrap relative min-h-[200px]'>
                {
                    (isLoading || isValidating) && (
                        <CommonLoader className='absolute xy-center' />
                    )
                }
                {
                    (!isLoading && !data) && (
                        <p>데이터가 없습니다!</p>
                    )
                }
                {
                    (data) && (
                        <React.Fragment>
                            <Filters />
                            <div className='table-wrapper mt-4'>
                                <table className='border-collapse w-full'>
                                    <TableHead />
                                    <TableBody data={ data } />
                                </table>
                            </div>
                            <CheckHistoryItemProvider historyItems={ data } >
                                { children }
                            </CheckHistoryItemProvider>
                        </React.Fragment>
                    )
                }
            </div>
        </div>
    )
}

export default CheckHistoryLayout;
