import React from 'react';
import { FACTS } from '@/constants/facts';
import { CompletedFactMapping, FactValuesType } from '@/constants/_types';
import { useCheckHistoryItemPopupProvider } from '@/context/Chek-history-item-popup-provicer';


interface Props {
    selectedFilter: FactValuesType | null;
    setFilter: React.Dispatch<React.SetStateAction<FactValuesType | null>>;
}

const ReportDetailFilter: React.FC<Props> = ({ selectedFilter, setFilter }) => {

    const { item } = useCheckHistoryItemPopupProvider();

    const boxStyle = React.useCallback((color: string): React.CSSProperties => {
        return {
            'backgroundColor': color
        }
    }, [])

    

    /**
     * docsTopDetailFactCheckResult 결과값이 0이 아닌지 판별
     * @return 0이 아니면 true를 반환
     */
    const isHaveCheckResultValue = React.useCallback((key: CompletedFactMapping['value']) => {
        if (!item) return false;

        const value = item.docsTopDetailInfo.docsTopDetailFactCheckResult[key];

        if (value === 0) return false;
        return true;
    }, [item])
    


    if (!item) return <></>
    
    return (
        <div className='flex items-center pl-[54px] pr-9 border-b-2 border-achromatic-04 bg-achromatic-white'>
            <div
                onClick={ () => setFilter(null) }
                className={`relative flex items-center justify-center cursor-pointer h-[60px] px-6 ${ selectedFilter === null ? 'body-lg-b text-primary-blue-02' : 'body-lg-m' }`}
            >
                전체
                { selectedFilter === null && <span className='absolute bottom-0 left-0 w-full h-[3px] bg-primary-blue-02'></span> }
            </div>
            {
                FACTS.map((fact,idx) => (
                    <div
                        key={ idx }
                        onClick={ () => isHaveCheckResultValue(fact.value) ? setFilter(fact.value) : undefined }
                        className={`relative h-[60px] px-6 flex items-center ${ isHaveCheckResultValue(fact.value) ? 'cursor-pointer' : 'cursor-default' }`}
                    >
                        <span
                            className={`
                                ${ selectedFilter === fact.value ? 'body-lg-b text-primary-blue-02' : 'body-lg-m' }
                                ${ isHaveCheckResultValue(fact.value) ? '' : 'text-achromatic-03' }
                            `}
                        >{ fact.label }</span>
                        <div
                            className='flex items-center justify-center w-[34px] h-6 ml-2.5 rounded-full body-sm-b text-achromatic-white'
                            style={ boxStyle(fact.color) }
                        >{ item.docsTopDetailInfo.docsTopDetailFactCheckResult[fact.value] }</div>
                        { selectedFilter === fact.value && <span className='absolute bottom-0 left-0 w-full h-[3px] bg-primary-blue-02'></span> }
                    </div>
                ))
            }
        </div>
    )
}

export default ReportDetailFilter;
