'use client';

import React from 'react';
import Image from 'next/image';
import FormInputMd from '@/components/form/Input-md';
import ButtonLg from '@/components/buttons/Button-lg';
import { useSubmit } from '@/hooks/signin/use-submit';

interface Props {
    setIsTwoFactorAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const SigninBox: React.FC<Props> = ({ setIsTwoFactorAuth }) => {

    const { onSubmitSignin } = useSubmit(setIsTwoFactorAuth);
    
    return (
        <div className='box-wrap flex flex-col items-center w-[500px]'>
            <div className="bi-area w-[313px]">
                <Image
                    src="/images/bi.png"
                    alt='bi'
                    width={313} height={69}
                    priority
                />
            </div>
            <div className="box-inner bg-achromatic-white w-full mt-[56px] pt-10 pb-20 px-[60px] rounded-lg">
                <h1 className='title-lg text-center'>로그인</h1>
                <form
                    action="post"
                    className='flex flex-col mt-8'
                    onSubmit={ onSubmitSignin }
                >
                    <FormInputMd
                        type='text'
                        name='id'
                        placeholder='아이디'
                        autoComplete='name'
                    />
                    <FormInputMd
                        type='password'
                        name='pw'
                        placeholder='비밀번호'
                        autoComplete='current-password'
                        className='mt-4'
                    />
                    <ButtonLg
                        type='submit'
                        label='로그인'
                        className='mt-8'
                    />
                </form>
            </div>
        </div>
    )
}

export default SigninBox;
