import React from 'react'
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useIntersectElement } from 'hooks/chat/useIntersecterElement';
import { ChatListClass, ChatListData } from 'services/chat/_fetch/_types';
import UserMessage from './UserMessage';
import BotMessage from './BotMessage';



interface Props {
    item: ChatListClass;
    isFirst?: boolean;
    isLast?: boolean;
    // addFetch?: () => Promise<void>;
    addFetch: ((options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<ChatListData | null, unknown>, Error>>) | null;
}

const Message = ({ item, isFirst, isLast, addFetch }: Props) => {

    const firstMessageRef = React.useRef<HTMLDivElement>(null);
    
    useIntersectElement({
        observeRef: firstMessageRef,
        deps: isFirst,
        addFetch: addFetch,
    })

    return (
        <div ref={ isFirst ? firstMessageRef : null }>
            <UserMessage item={ item } />
            <BotMessage item={ item } isLastItem={ isLast } />
        </div>
    )
}

export default Message;