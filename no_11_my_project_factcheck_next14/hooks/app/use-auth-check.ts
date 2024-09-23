import React from 'react';
import { Cookies } from 'react-cookie';

export function useAuthCheck() {

    React.useEffect(() => {
        const cookies = new Cookies();

    }, [])
}