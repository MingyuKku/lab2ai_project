'use client'

import React from "react";
import { useRouter } from "next/navigation";
import ButtonSs from "../buttons/Button-ss";
import { useFetchSignin } from "@/services/auth/use-fetch-signin";


const UserInfo = () => {
    const { replace } = useRouter();
    const { signout } = useFetchSignin();
    const onClickSignout = React.useCallback(async () => {
        const { isSuccess } = await signout();

        if (isSuccess === 'success') {
            replace('/sign-in', {
                scroll: false
            })
        }
    }, [])

    return (
        <div className='flex items-center'>
            <div className='body-sm'>홍길동님<span className='body-sm-b text-primary-blue ml-0.5'>(관리자)</span></div>
            <ButtonSs onClick={ onClickSignout } label='로그아웃' buttonType='cancle' className='w-[68px] ml-4' />
        </div>
    )
}

export default UserInfo;