'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import IconTriangle from '@/components/icon/Triangle-down';
import IconLink from '@/components/icon/Link';
import { DocsBottomDetailsInfo } from '@/services/check-history/_types';
import { useTextTransform } from '@/hooks/check-history/use-text-transform';


const LazyOriginalTextPopup = dynamic(() => import('@/containers/check-history/popup/report/Original-text-popup'));

interface Props {
    detailInfo: DocsBottomDetailsInfo;
}

const ReportDetailItem: React.FC<Props> = ({ detailInfo }) => {

    const { getDocsStatusText, getDocsStatusBgStyle, getDocsStatusBorderStyle } = useTextTransform();
    const [ popupFlag, updateFlag ] = React.useState(false);
    const POPUP_HEIGHT = 556;
    const itemEl = React.useRef<HTMLDivElement>(null);
    



    if (!detailInfo.docsSentenceFactCheckResultInfo.result) return <></>

    return (
        <div ref={ itemEl } className='flex mb-8'>
            <div className="fact shrink-0 flex flex-col items-center w-[60px] py-3">
                <div className='w-[18px] h-[18px] rounded' style={ getDocsStatusBgStyle(detailInfo.docsSentenceFactCheckResultInfo.result) }></div>
                <span className='body-sm whitespace-nowrap'>{ getDocsStatusText(detailInfo.docsSentenceFactCheckResultInfo.result) }</span>
            </div>
            <div style={ getDocsStatusBorderStyle(detailInfo.docsSentenceFactCheckResultInfo.result) } className="content ml-4 flex-1 rounded-lg p-5 bg-achromatic-white">
                <div className="title relative flex justify-between">
                    <h2 className='body-md-b'>{ detailInfo.query }</h2>
                    <div
                        onClick={ () => updateFlag(!popupFlag) }
                        className={`
                            shrink-0 w-[103px] h-[35px] ml-4 flex items-center justify-center shadow-02 border-[1.5px] border-achromatic-02 rounded-lg body-sm-m cursor-pointer
                            ${ popupFlag ? 'bg-achromatic-black text-achromatic-white' : 'bg-achromatic-white text-achromatic-black' }
                        `}
                    >
                        원문 보기
                        <div className={`ml-1 ${ popupFlag ? 'rotate-180' : '' }`}>
                            { !popupFlag && <IconTriangle /> }
                            { popupFlag && <IconTriangle color='white' /> }
                        </div>
                    </div>
                    {
                        popupFlag &&
                        <LazyOriginalTextPopup
                            queryId={ detailInfo.queryId }
                            checkResult={ detailInfo.docsSentenceFactCheckResultInfo.result }
                            updateFlag={ updateFlag }
                            height={ POPUP_HEIGHT }
                            // className={`${ isLast ? 'absolute bottom-12 right-0' : 'absolute top-12 right-0' }`}
                        />
                    }
                </div>
                <div className='flex mt-5'>
                    <div className="left shrink-0 body-sm-m text-[#959A9F] px-4">근거</div>
                    <div className="right">
                        <div className='sentence body-sm'>{ detailInfo.docsSentenceFactCheckResultInfo.detail }</div>
                        <div className='sources mt-2 flex items-center'>
                            {
                                detailInfo.docsSentenceFactCheckResultInfo.reference?.map((reference, idx) => (
                                    <a
                                        key={ idx }
                                        href={ reference }
                                        target='_blank'
                                        className='flex items-center h-6 px-2 mr-2 border border-achromatic-03 rounded shadow-04 body-sm'
                                    ><span className='body-ss mr-1'>출처 {idx+1}</span><IconLink /></a>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportDetailItem;
