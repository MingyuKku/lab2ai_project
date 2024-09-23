'use client'

import dynamic from 'next/dynamic';
import React from 'react'
import FullScreen from '@/components/fallback/Full-screen';


const LazySidePopup = dynamic(() => import('@/components/popup/Side'), {
    ssr: false,
    loading: () => <FullScreen />
});


const DataBankDetailPage = () => {

    // const items = useCheckHistoryItemProvider();

    // const initItem = React.useMemo(() => {
    //     return items.find((item) => item.seq === Number(id)) ?? null;
    // }, [])
    // const [ item ] = React.useState(initItem);

    const scrollElem = React.useRef<HTMLDivElement>(null); // 팝업의 스크롤 영역 DOM을 담은 변수
    const [ sidePopupFlag, setSidePopupFlag ] = React.useState(true);
    const [ scrollElemHeight, setScrollElemHeight ] = React.useState(0);


    return (
        <div>
            <LazySidePopup
                flag={ sidePopupFlag }
                setFlag={ setSidePopupFlag }
                isAppear={ true }
                isCloseRouteBack={ true }
                isWide={ true }
                scrollElem={ scrollElem }
                setScrollElemHeight={ setScrollElemHeight }
                scrollElClassName='bg-achromatic-05'
            >
                {/* {
                    item &&
                    <CheckHistoryItemPopupProvider
                        detailInfoitem={ item }
                        scrollElem={ scrollElem }
                        scrollElemHeight={ scrollElemHeight }
                    >
                        <LazyReportSummary pdfPrintRef={ pdfScanRef } />
                        <LazyReportDetail />
                    </CheckHistoryItemPopupProvider>
                } */}
            </LazySidePopup>
        </div>
    )
}

export default DataBankDetailPage;
