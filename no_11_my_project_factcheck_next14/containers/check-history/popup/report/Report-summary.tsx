import React from 'react';
import IconBi from '@/components/icon/Bi';
import IconDownload from '@/components/icon/Download';
import PieChart from './PieChart';
import SummaryText from './Summary-text';
import { useCheckHistoryItemPopupProvider } from '@/context/Chek-history-item-popup-provicer';
import { useTextTransform } from '@/hooks/check-history/use-text-transform';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TestRender from '../report/pdf-render/Test-render';
import ButtonSs from '@/components/buttons/Button-ss';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


interface Props {
    pdfPrintRef?: React.RefObject<HTMLDivElement>;
    isPdfDownloadButton?: boolean;
}
const ReportSummary: React.FC<Props> = ({ pdfPrintRef, isPdfDownloadButton = true }) => {

    const { item } = useCheckHistoryItemPopupProvider();
    const { getDocsStatusText, getDocsStatusBgStyle } = useTextTransform();
    
    // React.useEffect(() => {
    //     console.log('아템', item)
    // }, [])


    const onClickPDFDownload = React.useCallback(async () => {
        console.log('헤이', pdfPrintRef?.current)
        const element = pdfPrintRef?.current
        if (!element) return;
        

        // HTML 캔버스로 변환
        const canvas = await html2canvas(element, {
            // scale: 1.5,
            // useCORS: true,
            // allowTaint: false
        });

        const { offsetWidth, offsetHeight } = element;

        // console.log('머여', offsetWidth, offsetHeight)

        // 캔버스를 이미지로 변환
        const imgData = canvas.toDataURL('image/png', 1.0);
        // let doc = new jsPDF('p', 'mm', 'a4');
        let imgWidth = 208 // 이미지 가로 길이(mm)
        let pageHeight = 295  // 출력 페이지 세로 길이
        let imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight
        let margin = 0 // 출력 페이지 여백설정
        let position = 10
        heightLeft -= pageHeight
        let doc = new jsPDF('p', 'mm')

        //첫 페이지 출력
        doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight, '', 'FAST')
        

        //한 페이지 이상일 경우 루프 돌면서 출력
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight, '', 'FAST')
            heightLeft -= pageHeight;
        }

        // PDF 다운로드
        doc.save('sample.pdf');

    }, [])


    if (!item) return <></>

    return (
        <div className='pl-[54px] pr-9 pt-[68px] pb-4 bg-achromatic-white'>
            <div className="head flex items-center justify-between">
                <div className="left flex items-center">
                    <IconBi />
                    <span className='title-md text-primary-blue ml-2'>팩트체크 Report</span>
                </div>
                <div className="right">
                    {/* {
                        isPdfDownloadButton &&
                        <PDFDownloadLink document={<TestRender />} fileName="example.pdf">
                            {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
                        </PDFDownloadLink>
                    } */}
                    
                    {
                        isPdfDownloadButton &&
                        <ButtonSs
                            buttonType='cancle'
                            className='flex items-center justify-center body-sm-m w-[134px] h-[38px] shadow-02'
                            onClick={ onClickPDFDownload }
                        >
                            <IconDownload />
                            <span className='ml-1'>PDF 다운로드</span>
                        </ButtonSs>
                    }
                </div>
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
