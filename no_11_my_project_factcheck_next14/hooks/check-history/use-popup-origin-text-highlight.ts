import { CheckHistoryOriginText } from "@/lib/recoil/atoms/_types";
import React from "react";

export const usePopupOriginTextHighlight = (originText: CheckHistoryOriginText[], popupElem: React.RefObject<HTMLDivElement>) => {

    const highlightElem = React.useRef<HTMLParagraphElement>(null);
    

    /**
     * 강조된 텍스트가 화면에 노출될 수 있도록 popupElem의 스크롤 위치를 조정하는 함수
     */
    const setPopupElemScrollPosition = () => {
        if (!highlightElem.current || !popupElem.current) return;   

        const { offsetTop } = highlightElem.current;
        popupElem.current.scrollTo({
            top: offsetTop - 32
        })
    }


    React.useEffect(() => {
        const find = originText.find(text => text.isHighlight);
        if (!find) return;

        setPopupElemScrollPosition();
    }, [originText])


    return {
        highlightElem
    }
}