import React from "react";
import { InfiniteData } from "@tanstack/react-query";
import { isDesktop, isIOS, isMobile } from "react-device-detect";
import { MessageListType, ChatMessageGroup, ChatGroup, ChatListData } from "services/chat/_fetch/_types";

interface Props {
    // deps_messageList: ChatGroup[];
    // deps_messageList: ChatListData[];
    deps_messageList: InfiniteData<ChatListData | null, unknown> | undefined;
    // deps_isInitDomUpdate: boolean;
    iosMobileScrollRef: React.RefObject<HTMLDivElement>;
    // setIsInitDomUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    status: "error" | "success" | "pending";
    isFetchingNextPage: boolean;
}

export const useLayoutEffectScrollPosition = ({
    deps_messageList,
    // deps_isInitDomUpdate,
    iosMobileScrollRef,
    // setIsInitDomUpdate,
    status,
    isFetchingNextPage
}: Props) => {

    const previousScrollPosition = React.useRef(0);

    React.useMemo(() => {
        if (!iosMobileScrollRef.current) return;
        const container = (isIOS) ? iosMobileScrollRef.current : document.documentElement;
        // const container = document.documentElement;
        previousScrollPosition.current = container.scrollHeight - container.scrollTop;

    }, [deps_messageList]);


    React.useEffect(() => {
        if (!iosMobileScrollRef.current || status !== 'success') return;

        const container = (isIOS) ? iosMobileScrollRef.current : document.documentElement;
        container.scrollTop = 999999;
        // setIsInitDomUpdate(true);

    }, [iosMobileScrollRef, status])

    
    React.useLayoutEffect(() => {
        if (!iosMobileScrollRef.current || isFetchingNextPage || !deps_messageList?.pages || (deps_messageList?.pages && deps_messageList.pages.length <= 1)) return;

        const container = (isIOS) ? iosMobileScrollRef.current : document.documentElement;
        container.scrollTop = container.scrollHeight - previousScrollPosition.current;

        scrollBlock(false);
        
    }, [iosMobileScrollRef, isFetchingNextPage, deps_messageList?.pages])


    React.useEffect(() => {
        scrollBlock(isFetchingNextPage);

    }, [isFetchingNextPage])


    // React.useLayoutEffect(() => {
    //     if (!iosMobileScrollRef.current) return;
    //     if (!deps_isInitDomUpdate) { // 초기 레이아웃 이펙트 스크롤 다운
    //         // const container = (isIOS) ? iosMobileScrollRef.current : document.documentElement;
    //         // container.scrollTop = 999999;
    //         // setIsInitDomUpdate(true);

    //     } else { // 이후 더보기 레이아웃 이펙트 스크롤 포지션
    //         const container = (isIOS) ? iosMobileScrollRef.current : document.documentElement;
    //         // const container = document.documentElement;
    //         container.scrollTop = container.scrollHeight - previousScrollPosition.current;

    //         scrollBlock(false);
    //     }
        

    // }, [deps_messageList])

    const scrollBlock = React.useCallback((value: boolean) => {

        if (isIOS) {
            if (iosMobileScrollRef.current) {
                if (value) {
                    iosMobileScrollRef.current.style.overflow = 'hidden';
                } else {
                    iosMobileScrollRef.current.style.removeProperty('overflow');
                }
            }
        }
    }, [])
}