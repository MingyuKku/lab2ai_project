import React from 'react';
import IconBi from '@/components/icon/Bi';
import PieChart from './PieChart';
import SummaryText from './Summary-text';
import { useCheckHistoryItemPopupProvider } from '@/context/Chek-history-item-popup-provicer';
import { useTextTransform } from '@/hooks/check-history/use-text-transform';


interface Props {
    pageId: string;
}
const ReportSummary: React.FC<Props> = ({ pageId }) => {

    const { item } = useCheckHistoryItemPopupProvider();
    const { getDocsStatusText, getDocsStatusBgStyle } = useTextTransform();
    
    React.useEffect(() => {
        console.log('아템', item)
    }, [])

    if (!item) return <></>

    return (
        <div className='pl-[54px] pr-9 pt-[68px] pb-4 bg-achromatic-white'>
            <div className="head flex items-center">
                <IconBi />
                <span className='title-md text-primary-blue ml-2'>팩트체크 Report</span>
            </div>
            <div className="title flex items-center mt-10 pb-6">
                <div className='shrink-0 h-[34px] leading-[34px] body-md-b text-achromatic-white px-2 rounded-lg' style={ getDocsStatusBgStyle(item.docsStatus) }>{ getDocsStatusText(item.docsStatus) }</div>
                <h1 className='title-lg ml-3 break-all'>{ item.docsTitle }</h1>
            </div>
            <div className='fact flex items-center'>
                <div className="left flex-1">
                    <SummaryText />
                    {/* <FactElements /> */}
                </div>
                <div className="right flex-1 h-[390px] ml-3">
                    <PieChart />
                </div>
            </div>
        </div>
    )
}

export default ReportSummary;
