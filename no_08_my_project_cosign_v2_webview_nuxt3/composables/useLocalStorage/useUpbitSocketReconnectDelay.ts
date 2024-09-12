export const KEY = 'COSIGN-UPBIT-SOCKET-RECONNECT-TIME';


export const useUpbitSocketReconnectDelay = () => {

    // const 
    const getStorage = () => {
        if (!window) return;

        return window.localStorage.getItem(KEY);
    }


    const setStorage = (value: string) => {
        if (!window) return;

        window.localStorage.setItem(KEY, value);
    }


    return {
        getStorage,
        setStorage,
    }
}