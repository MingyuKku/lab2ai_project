import React from "react";
import { isDesktop, isIOS, isMobile } from "react-device-detect";
import { Timers } from "components/chat/MessageArea";
import { scrollToBottom } from 'utils';

interface Props {
    scrollFlag: boolean;
    elRef: React.MutableRefObject<HTMLDivElement | null>;
    timers: React.MutableRefObject<Timers>;
    setScrollFlag: React.Dispatch<React.SetStateAction<boolean>>;
}


/**
 * scrollFlag 값에 따라 스크롤의 위치를 아래로 이동시켜주는 훅
 * @param scrollFlag 이 훅의 의존성 배열에 들어갈 state값
 * @param elRef ios모바일 환경일 경우에 스크롤 위치 이동에 필요한 엘리먼트
 * @param timers scrollFlag값이 변경된 후 일정시간 후 스크롤을 이동시키기 위한 타이머 ref
 * @param setScrollFlag scrollFlag값을 업데이트 하는 setState함수
 */
export const useScrollFlag = ({
    scrollFlag,
    elRef, 
    timers,
    setScrollFlag,
}: Props) => {
    React.useEffect(() => {
        if (!elRef.current || !scrollFlag) return;

        if (timers.current.scrollToBottom) clearTimeout(timers.current.scrollToBottom);
        timers.current.scrollToBottom = setTimeout(() => {
            if (isIOS) {
                scrollToBottom('smooth', elRef.current!);
            } else {
                scrollToBottom('smooth');
            }
            // scrollToBottom('smooth');
            setScrollFlag(false);
        }, 150);


        // clean up
        return () => {
            if (timers.current.scrollToBottom) clearTimeout(timers.current.scrollToBottom);
        }
    }, [scrollFlag]);
}