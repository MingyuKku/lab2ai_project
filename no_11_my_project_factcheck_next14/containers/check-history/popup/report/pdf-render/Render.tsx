import React from 'react'
import ReportDetailItem from '../Report-detail-item'
import LazyReportSummary from '../Report-summary';
import { useCheckHistoryItemPopupProvider } from '@/context/Chek-history-item-popup-provicer';

const Render = ({ children }: React.PropsWithChildren) => {

    const { item } = useCheckHistoryItemPopupProvider();
    
    return (
        <div>
            { children }
            <LazyReportSummary isPdfDownloadButton={ false } />
            {/* {
                item &&
                item.docsBottomDetailsInfos.map((info, idx) => (
                    <ReportDetailItem
                        key={ idx }
                        detailInfo={ info }
                    />
                ))
            } */}
        </div>
    )
}

export default Render
