import Link from 'next/link';
import React from 'react'
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import ButtonSs from '@/components/buttons/Button-ss';
import { FactValuesType } from '@/constants/_types';
import { useTextTransform } from '@/hooks/check-history/use-text-transform';
import { alertState } from '@/lib/recoil/atoms/alert-state';
import { DocsList, HistoryDocumentJsonData } from '@/services/check-history/_types';
import { useClickButtons } from '@/hooks/check-history/use-click-buttons';


interface Props {
    data: DocsList[];
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


    const { onClickDelete } = useClickButtons();

    return (
        <tbody className='bg-achromatic-white'>
            {
                data.map((item,idx) => (
                    <tr key={ idx } className=''>
                        <td className='border border-achromatic-03'>
                            <Link
                                href={ isCompleted(item.status) ? `/check-history/${item.docsId}` : '' }
                                onClick={ () => isCompleted(item.status) ? undefined : openWaitAlert() }
                                scroll={ false }
                                className='flex items-center px-4 h-[50px] body-md'
                            >
                                <span className='line-clamp-2'>{ item.title }</span>
                            </Link>
                        </td>
                        <td className='border border-achromatic-03 w-[120px] max-w-[120px]'>
                            <Link
                                href={ isCompleted(item.status) ? `/check-history/${item.docsId}` : '' }
                                onClick={ () => isCompleted(item.status) ? undefined : openWaitAlert() }
                                scroll={ false }
                                className='flex items-center justify-center px-4 h-[50px] body-sm'
                            >
                                <span className='line-clamp-1 break-words'>{ item.requesterName }</span>
                            </Link>
                        </td>
                        <td className='border border-achromatic-03 w-[120px] max-w-[120px]'>
                            <Link
                                href={ isCompleted(item.status) ? `/check-history/${item.docsId}` : '' }
                                onClick={ () => isCompleted(item.status) ? undefined : openWaitAlert() }
                                scroll={ false }
                                className='flex items-center justify-center px-4 h-[50px] body-sm'
                            >
                                { item.format }
                            </Link>
                        </td>
                        <td className='border border-achromatic-03 w-[200px]'>
                            <Link
                                href={ isCompleted(item.status) ? `/check-history/${item.docsId}` : '' }
                                onClick={ () => isCompleted(item.status) ? undefined : openWaitAlert() }
                                scroll={ false }
                                className='flex items-center px-4 h-[50px] body-sm'
                                style={ getDocsStatusColorStyle(item.status) }
                            >
                                { isAnalysisComplete(item.status) && <div className='w-3 h-3 rounded-sm mr-2' style={ getDocsStatusBgStyle(item.status) }></div> }
                                <span className='line-clamp-2'>{ getDocsStatusText(item.status) }</span>
                            </Link></td>
                        <td className='border border-achromatic-03 w-[150px] max-w-[150px]'>
                            <Link
                                href={ isCompleted(item.status) ? `/check-history/${item.docsId}` : '' }
                                onClick={ () => isCompleted(item.status) ? undefined : openWaitAlert() }
                                scroll={ false }
                                className='flex items-center justify-center px-4 h-[50px] body-sm whitespace-nowrap'
                            >
                                { Date.parseUtcText(item.createdDateTime).format('yyyy.MM.dd HH:mm') }
                            </Link>
                        </td>
                        <td className='border border-achromatic-03'>
                            <Link
                                href={ isCompleted(item.status) ? `/check-history/${item.docsId}` : '' }
                                // onClick={ () => isCompleted(item.docsStatus) ? undefined : openWaitAlert() }
                                scroll={ false }
                                className='flex items-center justify-center px-4 h-[50px] body-sm whitespace-nowrap'
                            >
                                { '정상' }
                            </Link>
                        </td>
                        <td className='px-4 border border-achromatic-03'>
                            <div className='flex items-center justify-center'>
                                <ButtonSs
                                    label='삭제'
                                    buttonType='cancle' className='w-[47px]'
                                    onClick={ onClickDelete }
                                />
                            </div>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    )
}

export default TableBody;
