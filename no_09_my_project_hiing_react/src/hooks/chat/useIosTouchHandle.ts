import React from "react";
import { isIOS, isMobile } from "react-device-detect";
import { touchmovePreventHandler } from "utils";
// import { touchendhandler, touchmovehandler, touchstarthandler } from "services/chat/business";

interface Props {
    focusFlagState: boolean; 
}

/**
 * ios 모바일환경에서 채팅창 영역에 기본 터치 스크롤 이벤트 막는 기능 + 커스텀 스크롤 기능
 */
export const useIosTouchHandle = ({
    focusFlagState,
}: Props) => {
    
    React.useEffect(() => {
        if (!isIOS) return;
        
        const { documentElement }:{ documentElement: HTMLElement } = document;

        if (focusFlagState) {
            documentElement.addEventListener('touchmove', touchmovePreventHandler, { passive: false });

        } else {
            documentElement.removeEventListener('touchmove', touchmovePreventHandler);
        }

        // clean up
        return () => {
            documentElement.removeEventListener('touchmove', touchmovePreventHandler);
        }
        
    // }, [focusFlagState, elRef, domTouchmoveHandler])
    }, [focusFlagState])
}