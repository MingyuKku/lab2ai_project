import React from 'react'
import Backgound from './Backgound';
import LoginBox from './Login-box';

const HomeLogin = () => {
    return (
        <div className='home-login h-viewScreen flex items-center justify-center'>
            <Backgound />
            <LoginBox />
        </div>
    )
}

export default HomeLogin;
