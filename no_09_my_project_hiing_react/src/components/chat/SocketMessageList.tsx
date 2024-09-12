import React from 'react';
import { ChatGroup, ChatMessageGroup, MessageListType } from 'services/chat/_fetch/_types';

const LazyUserMessage = React.lazy(() => import('components/chat/UserMessage'));
const LazyBotMessage = React.lazy(() => import('components/chat/BotMessage'));

interface Props {
    // items: ChatMessageGroup[];
    items: ChatGroup[];
}


const SocketMessageList = ({ items }: Props) => {
    return (
        <div className='socket-message-list relative z-[1] px-3.5 py-2'>
            {
                items.map((item, idx) => (
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
                                    <div key={ i }>
                                        <React.Suspense><LazyUserMessage item={ chat } /></React.Suspense>
                                        <React.Suspense><LazyBotMessage item={ chat } isLastItem={ i === chats.length - 1 } /></React.Suspense>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default SocketMessageList;