import ComponentLoading from 'components/common/fallback/ComponentLoading';
import { useTestSignIn } from 'hooks/useTestSignIn';
import React from 'react'
import { Link } from 'react-router-dom';
import { getMemberTokenStorage } from 'services/token';

const Secret = () => {
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
            window.HiingBridge?.setMemberInfo(memberToken, 122, 'june', 'june');
        }
    }, [])


    const onClickDelete = () => {
        localStorage.removeItem('hiing-token');
    }


    return (
        <div className='select-auto h-viewScreen'>
            <ComponentLoading className='xy-center' />
            <button onClick={ testClick } className="text-gray-50">수동으로 셋팅</button>
            <span className='line block w-full h-px bg-gray-50'></span>
            <button className='text-gray-50'>로컬토큰삭제</button>
            {/* <span className='line block w-full h-px bg-gray-100'></span>
            <Link to='/test' className='text-gray-50'>테스트페이지로</Link> */}
        </div>
    )
}

export default Secret