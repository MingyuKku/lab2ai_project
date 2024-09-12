import React from "react";
import { useNavigationType, useLocation } from "react-router-dom";

export const prevLocationSessionName = 'prevLocaton';

export const useIsHistoryBack = () => {
    const location = useLocation();
    const navigationType = useNavigationType();
    const isHistoryBack = React.useRef(true);

    React.useEffect(() => {
        const prevLocation = window.sessionStorage.getItem(prevLocationSessionName);
        if (prevLocation && navigationType === 'POP') {
            
            if (JSON.stringify(location) === prevLocation) {
                isHistoryBack.current = false;
            } else {
                isHistoryBack.current = true;
            }
        } else {
            isHistoryBack.current = false;
        }
    }, [])

    return isHistoryBack;
}