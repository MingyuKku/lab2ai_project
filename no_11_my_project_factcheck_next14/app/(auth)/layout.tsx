import MainHeader from '@/components/headers/Main-header';
import { NextPage } from 'next';
import React from 'react'


interface Props {
    children: React.ReactNode;
}

const AuthLayout: NextPage<Props> = ({ children }) => {
    return (
        <div>
            <MainHeader />
            <div className='min-h-viewScreen pt-main-header'>
                { children }
            </div>
        </div>
    )
}

export default AuthLayout
