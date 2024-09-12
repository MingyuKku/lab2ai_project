import React from 'react'
import { tokenAxios } from '_fetch/token'

const SignUp = () => {

    const onClickSignUp = async () => {
        try {
            const { data } = await tokenAxios().post('member', {
                nick_nm1: 'june',
                nick_nm2: 'june',
                phone_no: 'dcdrfjBDqaQDlIkoJ58VRg==', // 내 핸드폰 암호화
                reg_type_cd: 4
            })
            console.log('가입 응답', data)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <button onClick={ onClickSignUp } className='bg-yellow-200'>휴대폰 번호로 회원가입!</button>
        </div>
    )
}

export default SignUp