import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { AppDispatch } from '_redux/store';
import { selectMember } from '_redux/member/selector';
import { selectChatRoomInfo } from '_redux/chatInfo/selector';
import { setChatInfo } from '_redux/chatInfo/slice';
import { socket_values } from 'context/Socket';
import { useChatSocket } from 'hooks/useChatSocket';
import { useScrollFlag } from 'hooks/chat/useScrollFlag';
import { useChatPageUnmount } from 'hooks/chat/useChatPageUnmount';
import { useMessageEventHandler } from 'hooks/chat/useMessageEventHandler';
import { useLayoutEffectScrollPosition } from 'hooks/chat/useLayoutEffectScrollPosition';
import { getChatList } from 'services/chat/_fetch/chatRoom';
import { ChatGroup, ChatListClass, ChatListData, chatTimeFormat, chatTimeFormatGetTime, chatTimeFormatText } from 'services/chat/_fetch/_types';
import { getCharacterSubscription } from 'services/character';
import { sendMixMixpanel } from 'services/chat/business';
import MessageList from './MessageList';
import SocketMessageList from './SocketMessageList';
import HelloMessage from './HelloMessage';
import MessageInput from 'components/chat/MessageInput';
import PageLoading from 'components/common/fallback/PageLoading';
import ErrorFallback from 'components/error/ErrorFallback';
// import PageLoading from 'components/common/fallback/PageLoading';
// import ErrorFallback from 'components/error/ErrorFallback';
// import { useInfiniteQuery, useQuery } from '@tanstack/react-query';



const ComponentLoading = React.lazy(() => import('components/common/fallback/ComponentLoading'));
const EffectMotion = React.lazy(() => import('components/chat/EffectMotion'));
const LoadingMessage = React.lazy(() => import('components/chat/LoadingMessage'));

interface Props {
    elRef: React.RefObject<HTMLDivElement>;
}

export interface Timers {
    [key: string]: NodeJS.Timeout | null;
    scrollToBottom: NodeJS.Timeout | null;
    effectStart: NodeJS.Timeout | null;
    effectKeep: NodeJS.Timeout | null;
    initChatEnter: NodeJS.Timeout | null;
}

const MessageArea = ({ elRef }: Props) => {

    const { characterSe } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { se } = useSelector(selectMember);
    // const token = useSelector(selectRefreshToken);
    const { subscribe_yn, character_nm } = useSelector(selectChatRoomInfo);

    const socket = useChatSocket();

    const messageListSize = 15;
    // const [ , startTransition ] = React.useTransition();
    // const [ messageList, setMessageList ] = React.useState<ChatGroup[]>([]);
    // const [ messageList, setMessageList ] = React.useState<(ChatListData | null)[]>([]);
    const [ socketMessageList, setSocketMessageList ] = React.useState<ChatGroup[]>([]);
    const [ submitFlag, setSubmitFlag ] = React.useState<boolean>(false);
    const [ effectFlag, setEffectFlag ] = React.useState<string | null>(null);
    const [ scrollFlag, setScrollFlag ] = React.useState<boolean>(false);
    const [ isInitDomUpdate, setIsInitDomUpdate ] = React.useState(false);
    const [ isHelleMessage, setIsHelleMessage ] = React.useState(false);
    // const [ pending, setPending ] = React.useState<boolean>(false);

    // const addMessageId =  React.useRef<string>('0');
    // const lastMessage = React.useRef<ChatListClass | null>(null);
    // const isLastItem =  React.useRef<boolean>(false);
    const isUserPushMessage =  React.useRef<boolean>(false);
    const msgWrapElRef = React.useRef<HTMLDivElement | null>(null);
    const timers = React.useRef<Timers>({
        scrollToBottom: null,
        effectStart: null,
        effectKeep: null,
        initChatEnter: null
    })

    const { 
        receiveMessageHandler,
        pushUserMessage,
        setLastMessage,
    } = useMessageEventHandler({
        setEffectFlag,
        setSubmitFlag,
        setSocketMessageList,
        setScrollFlag,
        timers,
        // lastMessage,
        // isUserPushMessage,
        socketMessageList,
    });


    React.useEffect(() => {
        if (!socket) return;
        socket.on(socket_values.onEvent.receive_message, receiveMessageHandler);

        return () => {
            socket.off(socket_values.onEvent.receive_message, receiveMessageHandler);
        }
    }, [socket, socketMessageList]);

    const queryClient = useQueryClient();
    const INDEX_KEY: QueryKey = ['chat-message-list', characterSe];

    const {
        data: messageItems, 
        isFetching, 
        isFetchingNextPage, 
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage, 
        hasNextPage,
        status, 
        error,
        refetch,
        isRefetching,
    } = useInfiniteQuery({
        queryKey: INDEX_KEY,
        queryFn: ({ pageParam  }) => getChatList(se!, characterSe, pageParam, messageListSize),
        initialPageParam: '0',
        getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
            const firstId = !lastPage?.flag ? allPages[0]?.chatList[0].chats[0].id : undefined;
            // const firstId = !lastPage?.flag ? lastPage?.chatList[0].chats[0].id : undefined;
            // return firstId;
            allPages.reverse();
            return firstId;
        },
        refetchOnWindowFocus: false,
    });


    // console.log('하이', isRefetching)
    React.useEffect(() => {
        if (!characterSe) return;

        const fetchSubscription = async () => {
            try {
                setIsHelleMessage(true); // 헬로메세지 리패치와 토큰만료시 리패치를 구분하기 위한 용도 
                await getCharacterSubscription(se!, characterSe);
                if (timers.current.initChatEnter) clearTimeout(timers.current.initChatEnter);
                timers.current.initChatEnter = setTimeout(() => {
                    dispatch(setChatInfo({
                        subscribe_yn: 1,
                    }));
                    sendMixMixpanel(characterSe);
                    refetch();
                }, 3000)
            } catch (err) {
                
            }
        }

        if (subscribe_yn === 2) { // 구독을 안했다면 구독!
            fetchSubscription();
        }

    }, [characterSe, subscribe_yn])



    React.useEffect(() => {
        if (isHelleMessage || !isRefetching) return;
        window.location.reload();
    }, [isHelleMessage, isRefetching])


    React.useEffect(() => {
        if (!characterSe || status !== 'success') return;

        // 채팅 리스트 첫 로드시 마지막 채팅 메세지 수집(소켓 메세지 붙일 때 날짜 표시여부에 사용하기 위함)
        const lastPage = messageItems.pages[messageItems.pages.length - 1];
        if (lastPage) {
            const lastChatList = lastPage.chatList[lastPage.chatList.length - 1];
            const lastChat = lastChatList.chats[lastChatList.chats.length - 1];
            setLastMessage({
                answer: lastChat.answer,
                character_se: Number(characterSe),
                id: lastChat.id,
                member_se: se!,
                message: lastChat.message,
                reg_dt: lastChat.reg_dt,
                timeText: chatTimeFormatText(lastChat.reg_dt),
                chatTimeText: chatTimeFormat(lastChat.reg_dt),
                chatTimestamp: new Date(lastChat.reg_dt).getTime(),
                chatTimestampFormat: chatTimeFormatGetTime(lastChat.reg_dt),
            })
        }

        // clean up
        return () => {
            queryClient.removeQueries({
                queryKey: INDEX_KEY
            })

            Object.keys(timers.current).forEach(key => {
                const timer = timers.current[key];
                if (timer) {
                    clearTimeout(timer);
                    timers.current[key] = null; // 타이머를 null로 설정
                }
            });
        }
    }, [characterSe, status])


    useLayoutEffectScrollPosition({
        // deps_messageList: messageList,
        deps_messageList: messageItems,
        // deps_isInitDomUpdate: isInitDomUpdate,
        iosMobileScrollRef : elRef,
        // setIsInitDomUpdate,
        status,
        isFetchingNextPage
    });


    useScrollFlag({
        scrollFlag: scrollFlag,
        elRef: elRef,
        timers: timers,
        setScrollFlag: setScrollFlag,
    });

    
    useChatPageUnmount({
        messageItems,
        memberSe: se!,
        characterSe,
        character_nm,
        status,
    });


    if (status === 'pending') {
        return <PageLoading />
    } else if (status === 'error') {
        return <ErrorFallback error={ error } />
    } 
    
    return (
        <div className='relative message-area pb-[66px] flex flex-col'>
            {
                isFetching &&
                <React.Suspense><ComponentLoading /></React.Suspense>
            }
            <React.Suspense>
                <EffectMotion
                    effectFlag={ effectFlag }
                />
            </React.Suspense>
            <HelloMessage />
            <MessageList
                ref={ msgWrapElRef }
                // items={ messageList }
                items={ messageItems.pages }
                isSocketMessage={ socketMessageList.length > 0 }
                // addFetch={ getMoreChatListFetch }
                addFetch={ hasNextPage ? fetchNextPage : null }
            />
            {
                socketMessageList.length > 0 &&
                <SocketMessageList items={ socketMessageList } />
            }
            { submitFlag && <React.Suspense><LoadingMessage className='px-3.5' /></React.Suspense> }
            {
                socket &&
                <MessageInput
                    socket={ socket }
                    pushUserMessage={ pushUserMessage }
                    submitFlag={ submitFlag }
                    elRef={ elRef }
                />
            }
        </div>
    )
}

export default MessageArea;