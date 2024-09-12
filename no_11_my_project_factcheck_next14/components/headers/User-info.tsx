'use client'

import React from "react";
import { useRouter } from "next/navigation";
import ButtonSs from "../buttons/Button-ss";


const UserInfo = () => {
    const { replace } = useRouter();
    const onClickSignout = React.useCallback(() => {
        replace('/sign-in', {
            scroll: false
        })
    }, [])

    return (
        <div className='flex items-center'>
            <div className='body-sm'>홍길동님<span className='body-sm-b text-primary-blue ml-0.5'>(관리자)</span></div>
            <ButtonSs onClick={ onClickSignout } label='로그아웃' buttonType='cancle' className='w-[68px] ml-4' />
        </div>
    )
}

export default UserInfo;