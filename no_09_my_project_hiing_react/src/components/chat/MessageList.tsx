import React from 'react'
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { ChatGroup, ChatListData } from 'services/chat/_fetch/_types';
import Message from './Message';


interface Props {
    // items: ChatGroup[];
    items: (ChatListData | null)[];
    isSocketMessage: boolean;
    // addFetch: () => Promise<void>;
    addFetch: ((options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<ChatListData | null, unknown>, Error>>) | null;
    className?: string;
}

const MessageList = React.forwardRef<HTMLDivElement, Props>(({ 
        items, 
        isSocketMessage, 
        className,
        addFetch,
    },
    ref
) => {

    return (
        <div ref={ ref } className={`relative z-[1] px-3.5 py-2 ${className ?? ''}`}>
            {
                items.map((group, gIdx, chatGroup) => (
                    <React.Fragment key={ gIdx }>
                        {
                            group?.chatList.map((item, idx, chatList) => (
                                <div key={ idx }>
                                    {
                                        item.date &&
                                        <div className='text-center pt-3 pb-2.5'>
                                            <p className='bg-primary-03 text-white inline-block text-[12px] leading-none px-2 py-1 rounded-full'>{ item.date }</p>
                                        </div>
                                    }
                                    <div>
                                        {
                                            item.chats.map((chat, i, chats) => (
                                                <Message
                                                    key={ i }
                                                    item={ chat }
                                                    isFirst={ gIdx === 0 && idx === 0 && i === 0 }
                                                    isLast={ isSocketMessage ? false : (gIdx === chatGroup.length - 1) && ((idx === chatList.length - 1) && (i === chats.length - 1)) }
                                                    addFetch={ addFetch }
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </React.Fragment>
                ))
            }
        </div>
    )
})

export default MessageList;