'use client';

import React from 'react'
import SigninBox from './Signin-box';
import TwoFactorAuthBox from './Two-factor-auth-box';

const Signin = () => {

    const [ isTwoFactorAuth, setIsTwoFactorAuth ] = React.useState(false);

    
    return (
        <div>
            {
                !isTwoFactorAuth && <SigninBox setIsTwoFactorAuth={ setIsTwoFactorAuth } />
            }
            {
                isTwoFactorAuth && <TwoFactorAuthBox />
            }
        </div>
    )
}

export default Signin
