import React from 'react'

interface RefreshTokenContextProps {
    token: string | null;
    updateToken: (token: string) => void;
}


const RefreshTokenContext = React.createContext<RefreshTokenContextProps | null>(null);

const RefreshTokenProvider = ({ children }: React.PropsWithChildren) => {

    const [ token, setToken ] = React.useState<string | null>(null);

    const updateToken = (token: string) => {
        console.log('업뎃실행함수')
        setToken(token);
    }

    
    return (
        <RefreshTokenContext.Provider value={{
            token,
            updateToken
        }}>
            { children }
        </RefreshTokenContext.Provider>
    )
}

export default RefreshTokenProvider;

export const useRefreshTokenContext = () => {
    const context = React.useContext(RefreshTokenContext);
    return context;
}