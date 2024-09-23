import React from 'react';
import Image from 'next/image';
import FormInputMd from '@/components/form/Input-md';
import ButtonLg from '@/components/buttons/Button-lg';
import { useRouter } from 'next/navigation';
import { useFetchSignin } from '@/services/auth/use-fetch-signin';
import { TwofaParams } from '@/services/auth/_types';


const TwoFactorAuthBox = () => {

    const { replace } = useRouter();
    const { response2faAuthentication } = useFetchSignin();

    const onSubmitCertComplete = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const param: TwofaParams = {
            number: formData.get('cert') as string
        }

        const { isSuccess } = await response2faAuthentication(param);
        if (isSuccess === 'success') replace('/check-history');
    }, [])

    return (
        <div className='box-wrap flex flex-col items-center w-[570px]'>
            <div className="bi-area w-[313px]">
                <Image
                    src="/images/bi.png"
                    alt='bi'
                    width={313} height={69}
                    priority
                />
            </div>
            <div className="box-inner bg-achromatic-white w-full mt-[56px] pt-10 pb-20 px-[60px] rounded-lg">
                <h1 className='title-lg text-center'>2차 인증</h1>
                <form
                    action="post"
                    className='flex flex-col mt-8'
                    onSubmit={ onSubmitCertComplete }
                >
                    <div className='flex items-center'>
                        <FormInputMd
                            type='text'
                            name='cert'
                            placeholder='이메일로 전송된 인증번호를 입력해 주세요.'
                            autoComplete='name'
                            className='w-full'
                        />
                        <div
                            className='flex items-center justify-center rounded-lg w-[154px] h-11 ml-4 bg-achromatic-04 title-sm'
                        >재전송</div>
                    </div>
                    
                    <ButtonLg
                        type='submit'
                        label='인증 완료'
                        className='mt-8'
                    />
                </form>
            </div>
        </div>
    )
}

export default TwoFactorAuthBox;
