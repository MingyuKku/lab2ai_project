import React from "react";
import { useRouter } from 'next/navigation';
import { delayed } from '@/utils';


interface Props {
    popupFlag: boolean;
    setPopupFlag: React.Dispatch<React.SetStateAction<boolean>>;
    isCloseRouteBack?: boolean;
}

export const useEffectPopup = ({ popupFlag, setPopupFlag, isCloseRouteBack }: Props) => {

    const { back } = useRouter();

    const MODAL_DURATION_TIME = 200;
    const POPUP_DURATION_TIME = 300;

    const delayTimer = React.useRef<NodeJS.Timeout>(null);

    const onClickClose = React.useCallback(async () => {
        setPopupFlag(false);
        if (isCloseRouteBack) {
            // isCloseRouteBack 옵션을 사용한 경우 팝업 트랜지션 지속시간만큼 delay후 뒤로가기
            await delayed(delayTimer, (MODAL_DURATION_TIME + POPUP_DURATION_TIME) / 2);
            back();
        }
    }, [])

    
    React.useEffect(() => {
            
        return () => {
            if (delayTimer.current) clearTimeout(delayTimer.current);
        }
    }, [])




    React.useEffect(() => {
        // flag 값에 따라 body에 overflow-hidden을 적용해서 스크롤을 막는 기능
        if (!window) return;

        const { body } = window.document;

        if (popupFlag) {
            body.style.overflow = 'hidden';   
        } else {
            body.style.removeProperty('overflow');
        }

        return () => {
            if (popupFlag) body.style.removeProperty('overflow');
        }
    }, [popupFlag])



    return {
        MODAL_DURATION_TIME,
        POPUP_DURATION_TIME,
        onClickClose,
    }
}