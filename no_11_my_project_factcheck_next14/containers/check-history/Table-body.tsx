import { FactValuesType } from '@/constants/_types';
import { useTextTransform } from '@/hooks/check-history/use-text-transform';
import { alertState } from '@/lib/recoil/atoms/alert-state';
import { HistoryDocumentJsonData } from '@/services/check-history/_types';
import Link from 'next/link';
import React from 'react'
import { useResetRecoilState, useSetRecoilState } from 'recoil';


interface Props {
    data: HistoryDocumentJsonData[];
}

const TableBody: React.FC<Props> = ({ data }) => {

    const { getDocsStatusText, getDocsStatusColorStyle, getDocsStatusBgStyle, isAnalysisComplete } = useTextTransform();
    const setAlertState = useSetRecoilState(alertState);
    const resetAlertState = useResetRecoilState(alertState);

    const isCompleted = React.useCallback((docsStatus: FactValuesType) => {
        if (docsStatus === 'PENDING_ANALYSIS' || docsStatus === 'IN_PROGRESS') return false;
        return true;
    }, [])

    const openWaitAlert = React.useCallback(() => {
        setAlertState({
            flag: true,
            title: null,
            description: '아직 분석이 진행중입니다.',
            buttons: {
                center: {
                    label: '확인',
                    type: 'OK',
                    onClick: () => {
                        resetAlertState();
                    }
                }
            }
        })
    }, [])

    return (
        <tbody className='bg-achromatic-white'>
            {
                data.map((item,idx) => (
                    <tr key={ idx } className=''>
                        <td className='border border-achromatic-03'>
                            <Link
                                href={ isCompleted(item.docsStatus) ? `/check-history/${item.seq}` : '' }
                                onClick={ () => isCompleted(item.docsStatus) ? undefined : openWaitAlert() }
                                scroll={ false }
                                className='flex items-center px-4 h-[50px] body-md'
                            >
                                <span className='line-clamp-2'>{ item.docsTitle }</span>
                            </Link>
                        </td>
                        <td className='border border-achromatic-03 w-[120px] max-w-[120px]'>
                            <Link
                                href={ isCompleted(item.docsStatus) ? `/check-history/${item.seq}` : '' }
                                onClick={ () => isCompleted(item.docsStatus) ? undefined : openWaitAlert() }
                                scroll={ false }
                                className='flex items-center justify-center px-4 h-[50px] body-md'
                            >
                                { item.docsRequesterName }
                            </Link>
                        </td>
                        <td className='border border-achromatic-03 w-[120px] max-w-[120px]'>
                            <Link
                                href={ isCompleted(item.docsStatus) ? `/check-history/${item.seq}` : '' }
                                onClick={ () => isCompleted(item.docsStatus) ? undefined : openWaitAlert() }
                                scroll={ false }
                                className='flex items-center justify-center px-4 h-[50px] body-md'
                            >
                                { item.docsFormat }
                            </Link>
                        </td>
                        <td className='border border-achromatic-03 w-[240px] max-w-[240px]'>
                            <Link
                                href={ isCompleted(item.docsStatus) ? `/check-history/${item.seq}` : '' }
                                onClick={ () => isCompleted(item.docsStatus) ? undefined : openWaitAlert() }
                                scroll={ false }
                                className='flex items-center px-4 h-[50px] body-md-m'
                                style={ getDocsStatusColorStyle(item.docsStatus) }
                            >
                                { isAnalysisComplete(item.docsStatus) && <div className='w-3 h-3 rounded-sm mr-2' style={ getDocsStatusBgStyle(item.docsStatus) }></div> }
                                <span className='line-clamp-2'>{ getDocsStatusText(item.docsStatus) }</span>
                            </Link></td>
                        <td className='border border-achromatic-03 w-[150px] max-w-[150px]'>
                            <Link
                                href={ isCompleted(item.docsStatus) ? `/check-history/${item.seq}` : '' }
                                onClick={ () => isCompleted(item.docsStatus) ? undefined : openWaitAlert() }
                                scroll={ false }
                                className='flex items-center justify-center px-4 h-[50px] body-sm whitespace-nowrap'
                            >
                                { Date.parseUtcText(item.docsCreatedDateTime).format('yyyy.MM.dd HH:mm') }
                            </Link>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    )
}

export default TableBody;
