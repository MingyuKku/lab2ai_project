'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import ButtonMd from '@/components/buttons/Button-md';
import IconUserPlus from '@/components/icon/User-plus';
import FullScreen from '@/components/fallback/Full-screen';


const LazySidePopup = dynamic(() => import('@/components/popup/Side'), {
    ssr: false,
});
const LazyPopupNewUserRegist = dynamic(() => import('@/containers/user-manage/popup/New-user-regist-form'), {
    ssr: false,
    loading: () => <FullScreen />
});


const RegistButton = () => {

    const [ sidePopupFlag, setSidePopupFlag ] = React.useState(false);

    const onClickRegistButton = React.useCallback(() => {
        setSidePopupFlag(true);
    }, [])

    return (
        <React.Fragment>
            <LazySidePopup
                flag={ sidePopupFlag }
                setFlag={ setSidePopupFlag }
                className=''
            >
                <LazyPopupNewUserRegist setSidePopupFlag={ setSidePopupFlag } />
            </LazySidePopup>
            <div className="button-area flex justify-end mt-8">
                <ButtonMd
                    onClick={ onClickRegistButton }
                    className='flex items-center justify-center w-[200px]'
                >
                    <IconUserPlus />
                    <span className='title-sm ml-2.5'>사용자 등록</span>
                </ButtonMd>
            </div>
        </React.Fragment>
    )
}

export default RegistButton;
