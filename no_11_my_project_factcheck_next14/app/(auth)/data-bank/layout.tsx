'use client'

import React from 'react';
import TableHead from '@/containers/data-bank/Table-head';
import TableBody from '@/containers/data-bank/Table-body';
import RequestCheckButton from '@/containers/check-history/Request-check-button';
import { RadioList } from '@/components/form/_types';
import { DocType } from '@/services/check-history/_types';
import { useFetchRequestCheckParser } from '@/services/check-history/use-fetch-request-check-parser';



const DataBanklayout = ({ children }: React.PropsWithChildren) => {
    const { requestTextParser, requestFileParser, requestUrlParser } = useFetchRequestCheckParser();

    const ITEMS: RadioList<DocType>[] = [
        {
            label: '인터넷 문서',
            value: 'url',
            submitApi: requestUrlParser,
        },
        {
            label: '문서 파일',
            value: 'file',
            submitApi: requestFileParser
        },
        {
            label: '텍스트',
            value: 'text',
            submitApi: requestTextParser
        },
    ]
    

    return (
        <div className='px-side py-10'>
            <div className="head">
                <h1 className='title-lg text-center'>데이터 뱅크</h1>
                <RequestCheckButton items={ ITEMS } label='데이터 등록' />
            </div>
            <div className='table-wrapper mt-5'>
                <table className='border-collapse w-full'>
                    <TableHead />
                    <TableBody />
                </table>
            </div>
            { children }
        </div>
    )
}

export default DataBanklayout;
