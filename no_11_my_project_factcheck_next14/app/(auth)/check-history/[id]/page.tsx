'use client'

import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import FullScreen from '@/components/fallback/Full-screen';
import { useCheckHistoryItemProvider } from '@/context/Check-history-item-provider';
import CheckHistoryItemPopupProvider from '@/context/Chek-history-item-popup-provicer';
import PdfRender from '@/containers/check-history/popup/report/pdf-render/Render';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const LazySidePopup = dynamic(() => import('@/components/popup/Side'), {
    ssr: false,
    loading: () => <FullScreen />
});
const LazyReportSummary = dynamic(() => import('@/containers/check-history/popup/report/Report-summary'), {
    ssr: false,
});
const LazyReportDetail = dynamic(() => import('@/containers/check-history/popup/report/Report-detail'), {
    ssr: false,
});

interface Props {
    params: {
        id: string;
    };
    searchParams: URLSearchParams;
}

const CheckHistoryIdPage: NextPage<Props> = ({ params, searchParams }) => {
    const { id } = params;

    const items = useCheckHistoryItemProvider();

    const initItem = React.useMemo(() => {
        return items.find((item) => item.docsId === Number(id)) ?? null;
    }, [])
    const [ item ] = React.useState(initItem);
    const [ sidePopupFlag, setSidePopupFlag ] = React.useState(true);

    const scrollElem = React.useRef<HTMLDivElement>(null); // 팝업의 스크롤 영역 DOM을 담은 변수
    const [ scrollElemHeight, setScrollElemHeight ] = React.useState(0);
    const pdfScanRef = React.useRef<HTMLDivElement>(null);

    return (
        <React.Fragment>
            <div ref={ pdfScanRef }>
                {
                    item &&
                    <CheckHistoryItemPopupProvider
                        detailInfoitem={ item }
                    >
                        <PdfRender>
                        </PdfRender>
                    </CheckHistoryItemPopupProvider>
                }
            </div>
            

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
                {
                    item &&
                    <CheckHistoryItemPopupProvider
                        detailInfoitem={ item }
                        scrollElem={ scrollElem }
                        scrollElemHeight={ scrollElemHeight }
                    >
                        <LazyReportSummary pdfPrintRef={ pdfScanRef } />
                        <LazyReportDetail />
                    </CheckHistoryItemPopupProvider>
                }
            </LazySidePopup>
        </React.Fragment>
    )
}

export default CheckHistoryIdPage;

