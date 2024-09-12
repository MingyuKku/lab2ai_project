import React from "react";
import { EmitData } from "context/Socket";
import { checkEffect, generateCustomID } from "services/chat/business";
import { Timers } from "components/chat/MessageArea";
import { ChatGroup, ChatListClass, ChatMessageGroup, MessageListType, chatTimeFormat, chatTimeFormatGetTime, chatTimeFormatText } from "services/chat/_fetch/_types";
import { messageMixpanel, messageWebview } from "hooks/useWebviewBridge";
import { useSelector } from "react-redux";
import { selectChatRoomInfo } from "_redux/chatInfo/selector";
import { useParams, useSearchParams } from "react-router-dom";
import { selectMember } from "_redux/member/selector";
import { formatDate } from "utils";
import { chatRead } from "services/chat/_fetch/chatRoom";


interface Props {
    setEffectFlag: React.Dispatch<React.SetStateAction<string | null>>;
    setSubmitFlag: React.Dispatch<React.SetStateAction<boolean>>;
    // setSocketMessageList: React.Dispatch<React.SetStateAction<ChatMessageGroup[]>>;
    setSocketMessageList: React.Dispatch<React.SetStateAction<ChatGroup[]>>;
    setScrollFlag: React.Dispatch<React.SetStateAction<boolean>>;
    // messageList: ChatMessageGroup[];
    // messageList: ChatGroup[];
    timers: React.MutableRefObject<Timers>;
    // lastMessage: React.MutableRefObject<MessageListType | null>;
    // lastMessage: React.MutableRefObject<ChatListClass | null>;
    // isUserPushMessage: React.MutableRefObject<boolean>;
    socketMessageList: ChatGroup[];
}

export const useMessageEventHandler = ({
    setEffectFlag,
    setSubmitFlag,
    setSocketMessageList,
    setScrollFlag,
    // messageList,
    timers,
    // lastMessage,
    // isUserPushMessage,
    socketMessageList
}: Props) => {
    
    const { characterSe } = useParams();
    const [ serchParams ] = useSearchParams();
    const { se } = useSelector(selectMember);
    const { character_nm } = useSelector(selectChatRoomInfo);
    const lastMessage = React.useRef<ChatListClass | null>(null);

    const findMessageIndex = React.useCallback((user_message: string) => {
        for (let i = 0; i < socketMessageList.length; i++) {
            const onlyUserMessageIndex = socketMessageList[i].chats.findIndex(chat => (chat.answer === user_message && chat.message === null))
            if (onlyUserMessageIndex > -1) {
                return [ i, onlyUserMessageIndex ]
            } else {
                return null;
            }
        }
    }, [socketMessageList])

    const receiveMessageHandler = React.useCallback(({ character_se, answer, inserted_id, degree, emotion, user_message }: EmitData) => {
        if (Number(character_se) !== Number(characterSe)) return;
        // console.log('리시브', socketMessageList)
        if (character_nm) {
            messageMixpanel({
                tracking_type: 'event',
                event_name: 'receive_chat',
                param: {
                    'persona': character_nm,
                    'location': serchParams.get('before_location') ?? '',
                    'emotion_type': emotion,
                    'emotion_power': String(degree),
                }
            })
        }

        const findIndex = findMessageIndex(user_message);

        if (!findIndex) { // 사용자가 직접 입력한 메세지가 아님, 앞전에 소켓 리시브로 받은 메세지일 경우
            pushUserMessage(user_message, answer, inserted_id);
            return;
        }

        console.log('강도', degree)
        console.log('감정', emotion)
        checkEffect({
            emotion: emotion,
            degree: degree,
            setEffectFlag,
            timers: timers,
            duration: 3500
        });
        setSubmitFlag(false);

        
        const todayString = formatDate(new Date(), 'yyyy-MM-dd HH:mm');
        const reg_dt = formatDate(Date.toUtcText(todayString), 'yyyy-MM-ddTHH:mm:ssZ');

        const [ rowIdx, colIdx ] = findIndex;

        setSocketMessageList((prev) => {
            const clonePrev = [...prev];

            if (
                clonePrev.length >= rowIdx &&
                clonePrev[rowIdx].chats.length >= colIdx
            ) {
                clonePrev[rowIdx].chats[colIdx] = {
                    ...clonePrev[rowIdx].chats[colIdx],
                    id: inserted_id,
                    message: answer,
                    reg_dt: reg_dt,
                    timeText: chatTimeFormatText(reg_dt),
                    chatTimeText: chatTimeFormat(reg_dt),
                    chatTimestamp: new Date(reg_dt).getTime(),
                    chatTimestampFormat: chatTimeFormatGetTime(reg_dt),
                }
            }

            return clonePrev;
        })

        setLastMessage({
            answer: user_message,
            character_se: Number(characterSe),
            id: inserted_id,
            member_se: se!,
            message: answer,
            reg_dt: reg_dt,
            timeText: chatTimeFormatText(reg_dt),
            chatTimeText: chatTimeFormat(reg_dt),
            chatTimestamp: new Date(reg_dt).getTime(),
            chatTimestampFormat: chatTimeFormatGetTime(reg_dt),
        });

        setScrollFlag(true);
        // isUserPushMessage.current = false;
    }, [socketMessageList]);

    
    const setLastMessage = React.useCallback((message: ChatListClass) => {
        if (!characterSe) return;

        lastMessage.current = message;

        const fetchChatRead = async () => {
            await chatRead(se!, characterSe, message.id)
        }
        fetchChatRead();
        
    }, [characterSe]);


    const pushUserMessage = React.useCallback((user_message: string, answer?: string, inserted_id?: string) => {
        if (!characterSe) return;
        if (!inserted_id) setSubmitFlag(true); // inserted_id이 존재하지 않는다 => 유저의 인풋으로 입력했을 경우

        const todayString = formatDate(new Date(), 'yyyy-MM-dd HH:mm');
        const reg_dt = formatDate(Date.toUtcText(todayString), 'yyyy-MM-ddTHH:mm:ssZ');

        const newMessage: ChatListClass = {
            answer: user_message,
            character_se: Number(characterSe),
            id: inserted_id ?? null,
            member_se: se!,
            message: answer ?? null,
            reg_dt: reg_dt,
            timeText: chatTimeFormatText(reg_dt),
            chatTimeText: chatTimeFormat(reg_dt),
            chatTimestamp: new Date(reg_dt).getTime(),
            chatTimestampFormat: chatTimeFormatGetTime(reg_dt),
        };

        if (inserted_id) {
            setLastMessage(newMessage);
        }

        setSocketMessageList((prev) => {

            const clonePrev = [...prev];

            if (!lastMessage.current) { // 대화 자체가 처음인 경우(대화 히스토리가 없음)
                clonePrev.push({
                    date: null,
                    chats: [newMessage]
                })

            } else {
                const now = chatTimeFormatGetTime();
                if (lastMessage.current.chatTimestampFormat === now) { // 기존 메세지와 추가할 메세지가 같은 [월.일]에 추가될 경우
                    if (clonePrev.length === 0) { // 채팅방 입장 후 첫 대화일 때
                        clonePrev.push({
                            date: null,
                            chats: [newMessage]
                        })

                    } else {
                        clonePrev[clonePrev.length - 1].chats.push(newMessage);
                    }
                    

                } else { // 날짜가 바뀐 경우
                    clonePrev.push({
                        date: chatTimeFormatText(),
                        chats: [newMessage]
                    })
                }
            }
            
            
            return clonePrev;
        });
        
        setScrollFlag(true); // 스크롤 위치 조정을 위해
    }, [characterSe])


    // React.useEffect(() => {
    //     console.log('라스트 메세지', lastMessage.current)
    //     // if (!lastMessage.current) return;

    //     // if (lastPage) {
    //     //     const lastChatList = lastPage.chatList[lastPage.chatList.length - 1];
    //     //     const lastChat = lastChatList.chats[lastChatList.chats.length - 1];

    //     //     const fetchChatRead = async () => {
    //     //         await chatRead(memberSe, characterSe, lastChat.id)
    //     //     }
    //     //     fetchChatRead();
    //     // }
    // }, [lastMessage])



    return {
        receiveMessageHandler,
        pushUserMessage,
        setLastMessage,
    }
}