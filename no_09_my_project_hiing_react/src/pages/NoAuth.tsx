import React from 'react'
import { isDesktop } from 'react-device-detect';
import { useTestSignIn } from 'hooks/useTestSignIn';
import { getMemberTokenStorage } from 'services/token';
import { tokenAxios } from '_fetch/token';

const NoAuth = () => {
    const test = useTestSignIn(); // 테스트
    
    const testClick = React.useCallback(() => {
        // window.HiingBridge?.setMemberInfo(
        //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5YTU4MWUwNmZjZDNkYTMzIiwic2lkIjoiQW1ranF3Z0tKd3J5eWxlNkpRZ3VXVVlLa01JMVVKWGQiLCJ1bmlxdWVfbmFtZSI6IkRzZGhVbHFxc1ZUcGlia2hSejdTWlpIQU9hY2dmVU04IiwiZXhwIjoxNzA2NjYyNTc0fQ.JFqwnTEPURGaf6_ShZ1_sAo980S123l_ETfJFmkJYlY',
        //     42,
        //     '55'
        // );
        // localStorage.setItem('web-test', 'test');
        const memberToken = getMemberTokenStorage();
        if (!memberToken) test();
        else {
            window.HiingBridge?.setMemberInfo(memberToken, 1, 'test', 'test');
        }
    }, [])

    const onClickDelete = () => {
        localStorage.removeItem('hiing-token');
    }
    
    const testSignIn = async () => {
        try {
            const { data } = await tokenAxios().post('member', {
                nick_nm1: 'june',
                nick_nm2: 'june',
                phone_no: 'dcdrfjBDqaQDlIkoJ58VRg==', // 내 핸드폰 암호화
                reg_type_cd: 3
            })
            console.log('가입 응답', data)

        } catch (err) {
            console.log(err)
        }
            
    }

    return (
        <React.Fragment>
            <p>웹 환경에서 화면에 아무것도 안나올 때 아래 버튼을 누르세요!</p>
            <button onClick={ testClick } className="bg-primary-01 text-white">수동으로 셋팅하기!</button>
            <br/>
            <br/>
            <br/>
            {/* <button onClick={ testSignIn } className='bg-orange-300'>상용환경에서 회원가입</button> */}
            <br />
            <br />
            {
                !isDesktop &&
                <React.Fragment>
                    <p>그래도 아무것도 안나올 때 아래 버튼을 누르고 다시 시도하세요</p>
                    <button onClick={ onClickDelete } className='bg-orange-300'>로컬 토큰 삭제</button>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default NoAuth;