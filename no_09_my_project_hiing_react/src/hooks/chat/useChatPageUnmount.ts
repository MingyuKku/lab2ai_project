import { InfiniteData } from "@tanstack/react-query";
import { messageMixpanel } from "hooks/useWebviewBridge";
import React from "react";
import { ChatListClass, ChatListData, MessageListType } from "services/chat/_fetch/_types";
import { chatRead } from "services/chat/_fetch/chatRoom";

interface Props {
    messageItems: InfiniteData<ChatListData | null, unknown> | undefined;
    memberSe: number;
    characterSe: string | undefined;
    character_nm: string;
    status: "success" | "pending" | "error";
}

/**
 * 컴포넌트의 클린업 실행시 마지막 채팅 리스트를 읽었다는 것을 서버에 전송하는 훅
 * @param param0 
 */
export const useChatPageUnmount = ({
    messageItems,
    memberSe,
    characterSe,
    character_nm,
    status
}: Props) => {

    // React.useEffect(() => {
    //     if (!characterSe || status !== 'success') return;

    //     // return () => {
    //         const lastPage = messageItems?.pages[0];
    //         if (lastPage) {
    //             const lastChatList = lastPage.chatList[lastPage.chatList.length - 1];
    //             const lastChat = lastChatList.chats[lastChatList.chats.length - 1];

    //             const fetchChatRead = async () => {
    //                 await chatRead(memberSe, characterSe, lastChat.id)
    //             }
    //             fetchChatRead();
    //         }
    //     // }
    // }, [characterSe, status])



    React.useEffect(() => {
        if (!character_nm) return;

        // clean up
        return () => {
            messageMixpanel({
                tracking_type: 'event',
                event_name: 'leave_chatroom',
                param: {
                    'persona': character_nm,
                }
            })
        }
    }, [character_nm])
}