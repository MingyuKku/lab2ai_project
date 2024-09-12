import { useCheckHistoryItemPopupProvider } from '@/context/Chek-history-item-popup-provicer';
import React from 'react'

const SummaryText = () => {

    const { item } = useCheckHistoryItemPopupProvider();

    if (!item) return <></>
    
    return (
        <div>
            {/* <h2 className='title-md'>120개 문장(이슈) 중 80%가 <span className='text-secondary-degree-05'>사실</span>로 판단됨</h2> */}
            <div className='border border-achromatic-03 rounded p-5 mt-5'>
                <p className='body-md'>{ item.docsTopDetailInfo.docsTopDetailReport }</p>
            </div>
        </div>
    )
}

export default SummaryText;
