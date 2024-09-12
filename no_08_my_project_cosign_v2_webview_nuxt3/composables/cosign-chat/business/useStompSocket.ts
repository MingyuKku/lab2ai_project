import type { IMessage } from "@stomp/stompjs";
import { useCommon } from "~/composables/_app/useCommon";
import type { IMessageBody } from "~/pinia/cosign-chat/_types";
import { piniaStompSocket } from "~/pinia/cosign-chat/piniaStompSocket";
import type { ClassMessageHistory } from "../service/_types";
import { useDateFormat } from "./useDateFormat";

export const useStompSocket = () => {

    // const RECONNECT_TIMER = ref<NodeJS.Timeout | null>(null);
    const { stomp, socketRoom, socketUser } = piniaStompSocket();
    const { isDev } = useCommon();


    const connectStompClient = () => {
        const config = useRuntimeConfig();
        const { $createStompClient2 } = useNuxtApp();
        if (stomp.client) stomp.client.deactivate(); // 앞전에 연결된 커넥션 제거
        stomp.client = $createStompClient2(config.public.CHAT_SOCKET_URL);
        stompClientMethods();
        stomp.client.activate();
    }


    const stompClientMethods = () => {
        if (!stomp.client) return;

        stomp.client.onConnect = (frame) => {
            if (frame.command !== "CONNECTED") return;
            subscription();
        }

        stomp.client.onStompError = (frame) => {

            console.log('sockjs 연결 에러', frame)
            alert(`웹 소켓 연결 과정에서 stomp 에러가 발생했습니다. 불편을 드려 죄송합니다. ${frame}`)
            // 실패시 SockJs 재실행
        }

        stomp.client.onDisconnect = (frame) => {

            console.log('sockjs disconnect', frame)
            if (isDev()) alert(`sockjs disconnect ${JSON.stringify(frame)}`)
        }

        stomp.client.onWebSocketClose = (frame) => {

            console.log('sockjs onWebSocketClose', frame, frame.code)
            // alert(`sockjs onWebSocketClose ${JSON.stringify(frame)}`)

            // deactive를 통해 소켓을 닫은 경우 frame.code === 1000
            if (frame.code !== 1000) {
                // 원치 않는 상황에 연결이 끊어진 경우
                // stomp.client?.activate();
                // connectStompClient();
            }
        }

        stomp.client.onWebSocketError = (frame) => {

            console.log('sockjs onWebSocketError', frame)
            // alert(`sockjs onWebSocketError ${frame}`)
            alert(`웹 소켓 연결 과정에서 에러가 발생했습니다. 불편을 드려 죄송합니다. ${frame}`)
        }

        stomp.client.onChangeState = (frame) => {

            console.log('sockjs 상태 변경', frame)
            // alert(`sockjs 상태 변경 ${frame}`)
        }

        // stomp.client.onUnhandledReceipt = (frame) => {
        //     console.log('sockjs onUnhandledReceipt', frame)
        // }

        // stomp.client.onUnhandledMessage = (frame) => {
        //     console.log('sockjs onUnhandledMessage', frame)
        // }
    }


    const subscription = () => {
        if (!stomp.client) return;

        stomp.client.subscribe(
            `/tc/room/${socketRoom.room_uuid}`,
            async (msg: IMessage) => {
                const parseBody: IMessageBody = JSON.parse(msg.body);
                // alert(`응답: ${parseBody.message}`)
                // console.log('stomp 웹소켓 응답', parseBody);

                const newMessage: ClassMessageHistory = {
                    ...parseBody,
                    uiType: isEqualUuid(parseBody.user_uuid) ? 'my' : 'others',
                    date_format: useDateFormat().format(Date.parseUtcToLocal(parseBody.input_date_time))
                }
                // console.log('뉴메세지', newMessage)
                piniaStompSocket().messages.push(newMessage);
                
                await nextTick();
                if (isEqualUuid(parseBody.user_uuid)) scrollToBottom();
            }
        )
    }


    /**
     * 소켓 응답 메세지의 uuid와 유저의 uuid를 비교함
     * @returns 유저의 메세지라면 true, 타인이면 false를 반환
     */
    const isEqualUuid = (user_uuid: string) => socketUser.user_uuid === user_uuid;

    
    const scrollToBottom = (isBehavior?: ScrollBehavior) => {
        const { chatWrapRef } = piniaStompSocket();
        if (!window || !chatWrapRef) return;

        const { isMobile, isIos } = useDevice();

        if (isIos) { // ios모바일에서는 chatWrapRef DOM에 스크롤이 생기게 만들었기 때문에
            chatWrapRef.scrollTo({
                top: 999999,
                behavior: isBehavior,
            })
        } else {
            window.scrollTo({
                top: 999999,
                behavior: isBehavior,
            })
        }
    }


    const clearStompClient = () => {
        if (stomp.client) {
            stomp.client.deactivate();
        }
        piniaStompSocket().messages = [];
    }

    // onUnmounted(() => {
    //     if (RECONNECT_TIMER.value) clearTimeout(RECONNECT_TIMER.value);
    // })

    return {
        connectStompClient,
        clearStompClient,
        isEqualUuid,
        scrollToBottom,
    }
}