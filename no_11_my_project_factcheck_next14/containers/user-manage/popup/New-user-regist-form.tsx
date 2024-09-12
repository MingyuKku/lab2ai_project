import React from 'react';
import IconUserPlus from '@/components/icon/User-plus';
import NewUserRegistText from './New-user-regist-text';
import NewUserRegistAuth from './New-user-regist-auth';
import ButtonLg from '@/components/buttons/Button-lg';


interface Props {
    setSidePopupFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupNewUserRegist: React.FC<Props> = ({ setSidePopupFlag }) => {

    // 'test-user-list'
    const onSubmitRegistUser = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userName = formData.get('name') as string;
        const userId = formData.get('id') as string;
        const userEmail = formData.get('email') as string;
        const userAuth = formData.get('auth') as 'admin' | 'normal';


        // 임시로직
        // if (!window) return;
        // const items = window.sessionStorage.getItem('test-user-list');
        // if (!items) return;
        // const parseItems = JSON.parse(items) as User[];
        // parseItems.push({
        //     name: userName,
        //     id: userId,
        //     email: userEmail,
        //     auth: userAuth,
        //     createAt: new Date().format('yyyy.MM.dd')
        // })
        // window.sessionStorage.setItem('test-user-list', JSON.stringify(parseItems));
        setSidePopupFlag(false);

    }, [])

    return (
        <div className='pl-[54px] pr-9 py-[68px]'>
            <div className='flex items-center'>
                <IconUserPlus color='black' />
                <h1 className='title-lg ml-2'>신규 회원 등록</h1>
            </div>
            <form onSubmit={ onSubmitRegistUser } action="post" className='mt-9'>
                <div className="form-box rounded-l overflow-hidden">
                    <NewUserRegistText
                        label='이름'
                        inputName='name'
                        borderPos='top'
                        inputRule='한글, 영어 10자 이하'
                        inputClassName='w-[180px]'
                    />
                    <NewUserRegistText
                        label='아이디'
                        inputName='id'
                        inputRule='한글, 영어, 숫자 8~12자'
                        inputClassName='w-[180px]'
                    />
                    <NewUserRegistText
                        label='이메일'
                        inputName='email'
                        inputClassName='w-[336px]'
                    />
                    <NewUserRegistAuth
                        label='권한'
                        inputName='auth'
                        borderPos='bottom'
                    />
                </div>
                
                <div className='body-sm text-primary-red mt-6'>* 비밀번호는 입력한 이메일로 자동 생성되어 발송됩니다.</div>
                <div className="button-area flex items-center justify-center mt-10">
                    <ButtonLg
                        label='회원 등록'
                        type='submit'
                        className='w-[220px] title-sm'
                    />
                </div>
            </form>
        </div>
    )
}

export default PopupNewUserRegist;
