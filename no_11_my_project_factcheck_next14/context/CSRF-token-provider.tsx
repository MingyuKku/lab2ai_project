'use client'

import React, { createContext, useContext } from 'react'


const CsrfTokenContext = createContext<{
    csrfToken: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

interface Props {
    token: string;
    children?: React.ReactNode;
}

const CSRFTokenProvider: React.FC<Props> = ({ token, children }) => {
    const [ csrfToken, setToken ] = React.useState(token);

    return (
        <CsrfTokenContext.Provider value={{ csrfToken, setToken }}>
            { children }
            <div data-token={ token }></div>
        </CsrfTokenContext.Provider>
    )
}

export default CSRFTokenProvider;

export const useCsrfToken = () => {
    return useContext(CsrfTokenContext);
}