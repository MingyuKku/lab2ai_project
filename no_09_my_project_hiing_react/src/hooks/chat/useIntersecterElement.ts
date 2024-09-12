import React from "react";
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query";
import { ChatListData } from "services/chat/_fetch/_types";

interface Props {
    observeRef: React.RefObject<HTMLDivElement>;
    deps: boolean | undefined;
    // addFetch: (() => Promise<void>) | null;
    addFetch: ((options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<ChatListData | null, unknown>, Error>>) | null;
}

export const useIntersectElement = ({
    observeRef,
    deps,
    addFetch,
}: Props) => {
    React.useEffect(() => {
        if (!observeRef.current || !deps || !addFetch) return;

        const options = {
            root: null,
            threshold: 1,
            rootMargin: '-56px 0px' // 헤더 높이만큼
        }

        const observer = new IntersectionObserver(([entry], observer) => {
            if (entry.isIntersecting) {
                addFetch();
            }
        }, options);

        observer.observe(observeRef.current);
        

        return () => {
            observer.disconnect();
        };

    }, [observeRef, deps, addFetch])
    // }, [observeRef])
}