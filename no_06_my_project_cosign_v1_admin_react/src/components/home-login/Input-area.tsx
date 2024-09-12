import React from 'react'
import InputAreaEmail from './Input-area-email';
import InputAreaPassword from './Input-area-password';
import ButtonGradient from 'components/common/button/Gradient';
import { useFetchLogin } from 'containers/home-login/useFetchLogin';
import { LoginParams } from 'containers/home-login/_types';
import { useNavigate } from 'react-router-dom';

const InputArea = () => {

    const INPUT_NAME_EMAIL = 'email';
    const INPUT_NAME_PASSWORD = 'password';

    const navigate = useNavigate();
    const { login } = useFetchLogin();

    const onSubmitForm = React.useCallback(async (e: React.FocusEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const params: LoginParams = {
            username: e.target[INPUT_NAME_EMAIL].value,
            password: e.target[INPUT_NAME_PASSWORD].value,
        }

        const { isSuccess } = await login(params);
        if (isSuccess === 'success') navigate('/faq', { replace: true })
        else alert('아이디, 비밀번호가 잘못되었습니다.');

    }, [])

    return (
        <div className='input-area w-full mt-2'>
            <form
                method='post'
                onSubmit={ onSubmitForm }
            >
                <InputAreaEmail name={ INPUT_NAME_EMAIL } />
                <InputAreaPassword name={ INPUT_NAME_PASSWORD } />
                <div className="button-wrap w-full mt-space-top-lg">
                    <ButtonGradient label='로그인' type='submit' />
                </div>
            </form>
        </div>
    )
}

export default InputArea;
