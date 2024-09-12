import React from 'react';
import { Link } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { GET_POPUP_LIST } from 'constants/react-query-keys';
import { useFetchPopup } from 'hooks/popup/useFetchPopup';
import PopupTableTitle from 'components/popup/Table-title';
import Check from 'components/common/input/Check';
import Button from 'components/common/button/Button';


const Popup = () => {

    const { getPopupList } = useFetchPopup();

    const { data: popupList, status } = useQuery({
        queryKey: [GET_POPUP_LIST], 
        queryFn: () => getPopupList(),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });


    

    if (status === 'pending') {
        return <p>데이터 로딩중...</p>
    }

    if (status === 'error') {
        return <p>에러 발생!</p>
    }

    if (!popupList) {
        return <p>데이터가 없어요!</p>
    }

    return (
        <div>
            <div className="sub-header flex items-center justify-between mb-space-bottom-sm">
                <Link to='/popup/regist' className='flex items-center justify-center w-32 rounded-md overflow-hidden'>
                    <Button label='팝업 배너 등록' />
                </Link>
            </div>
            <PopupTableTitle />
            {
                popupList.map((item, idx) => (
                    <Link
                        key={ idx }
                        to={ `/popup/${item.bannerId}/update` }
                        className='flex items-center py-2 min-h-12 text-body-3r odd:bg-bg-gray-04 hover:bg-bg-gray-03'
                    >
                        <div className='w-[10%] shrink-0 break-all break-words text-center'>{ item.bannerNumber }</div>
                        <div className='w-[20%] shrink-0 break-all break-words text-center'>{ item.webLink }</div>
                        <div className='w-[15%] shrink-0 break-all break-words flex items-center justify-center'>
                            <Check
                                id='blank'
                                name='blank'
                                label='새 창'
                                isChecked={ item.webLinkNewWindowFlag }
                                readOnly
                            />
                        </div>
                        <div className='w-[20%] shrink-0 break-all break-words text-center'>{ item.appDeepLink }</div>
                        <div className='w-[35%] shrink-0 break-all break-words text-center p-1'>
                            <img
                                src={ item.bannerImage }
                                alt="banner"
                                width={100} height={100}
                                loading='lazy'
                            />
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default Popup
