'use client'

import React from 'react'

import ReportDetailFilter from './Report-detail-filter';
import ReportDetailItem from './Report-detail-item';
import { usePopupDetailFilter } from '@/hooks/check-history/use-popup-detail-filter';



const ReportDetail: React.FC = () => {

    const { filter, setFilter, docsBottomDetailsInfos } = usePopupDetailFilter();


    return (
        <div>
            {
                docsBottomDetailsInfos &&
                <React.Fragment>
                    <ReportDetailFilter selectedFilter={ filter } setFilter={ setFilter } />
                    <div className="items pl-[54px] pr-9 py-10">
                        {
                            docsBottomDetailsInfos.map((info, idx) => (
                                <ReportDetailItem
                                    key={ idx }
                                    detailInfo={ info }
                                />
                            ))
                        }
                    </div>
                </React.Fragment>
            }
        </div>
    )
}

export default ReportDetail;
