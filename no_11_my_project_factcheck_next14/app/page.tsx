'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Signin from '@/components/signin/Signin';


const AppPage = () => {

    const userInfo = false;

    const { replace } = useRouter();

    React.useEffect(() => {
        if (!userInfo) replace('/sign-in');
        
    }, [userInfo])
    
    return (
        <div></div>
    )
}

export default AppPage;
