import React from 'react';
import Signin from '@/components/signin/Signin';
import { NextPage } from 'next';

const SigninPage: NextPage = () => {
    return (
        <div className='min-h-viewScreen flex items-center justify-center'>
            <Signin />
        </div>
    )
}

export default SigninPage
