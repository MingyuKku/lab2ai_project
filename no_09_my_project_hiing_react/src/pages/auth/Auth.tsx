import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMember } from '_redux/member/selector';
// import NoAuth from 'pages/NoAuth';
import Secret from 'pages/Secret';
import ComponentLoading from 'components/common/fallback/ComponentLoading';

const Auth = () => {
    const { se } = useSelector(selectMember);
    
    // if (se) {
    //     return (
    //         <div className='bg-green-400'>
    //             <h1>테스트 화면</h1>
    //             <p>{ se } se값!</p>
    //             <Outlet />
    //         </div>
    //     )
    // } else {
    //     return (
    //         <div className='bg-green-400'>
    //             <h1>테스트 화면</h1>
    //             <p>{ se } se값이 없어!!</p>
    //         </div>
    //     )
    // }
    if (se) {
        return <Outlet />
    } else {
        return (
            <div className='select-auto h-viewScreen'>
                <ComponentLoading className='xy-center' />
            </div>
        )
    }
}

export default Auth