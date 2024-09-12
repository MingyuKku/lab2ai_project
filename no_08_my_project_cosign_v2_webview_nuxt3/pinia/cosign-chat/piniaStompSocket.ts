import type { Client, IMessage, Stomp } from '@stomp/stompjs';
import { PiniaStompSocket } from "../keys";
import type { ChatRoom, ChatUser, IMessageBody } from './_types';
import type { ClassMessageHistory } from '~/composables/cosign-chat/service/_types';
import { useDateFormat } from "~/composables/cosign-chat/business/useDateFormat";


export const piniaStompSocket = defineStore(PiniaStompSocket, () => {

    // stomp소켓 client인스턴스를 담고있는 변수
    const stomp = reactive<{
        client: Client | null;
    }>({
        client: null,
    })


    // 소켓 룸 정보를 담고있는 변수
    const socketRoom = reactive<ChatRoom>({
        room_uuid: '',
        room_name: '',
        inactive: true,
    })

    // 소켓 유저 정보를 담고있는 변수
    const socketUser = reactive<ChatUser>({
        user_uuid: '',
        user_nickname: '',
        permission: 'DEFAULT',
    })


    const updateSocketRoom = (room: ChatRoom | null) => {
        if (!room) return;

        socketRoom.room_uuid = room.room_uuid;
        socketRoom.room_name = room.room_name;
        socketRoom.inactive = room.inactive;
    }

    const updateSocketUser = (user: ChatUser | null) => {
        if (!user) return;

        socketUser.permission = user.permission;
        socketUser.user_nickname = user.user_nickname;
        socketUser.user_uuid = user.user_uuid;
    }



    const messages = ref<ClassMessageHistory[]>([]);


    const updateMessage = (data?: ClassMessageHistory[]) => {
    // const updateMessage = (data?: GroupbyDateMessageHistory[], updateType?: 'init' | 'update') => {
        if (!data) return;

        messages.value = data;
    }


    const deleteMessage = (messageId: number) => {
        const fineId = messages.value.findIndex(item => item.message_id === messageId);
        if (fineId > -1) {
            messages.value.splice(fineId, 1);
        }
    }

    const myComplaintMessage = (messageId: number) => {
        const fineId = messages.value.findIndex(item => item.message_id === messageId);
        if (fineId > -1) {
            // 이미 신고한 메세지임을 알려줌
            // messages.value.splice(fineId, 1);
        }
    }

    // 모바일에서 스크롤 위치를 컨트롤 하기 위해 스크롤이 생기는 DOM을 담는 변수
    const chatWrapRef = ref<HTMLDivElement>();


    const setRefElement = (el?: HTMLDivElement) => {
        chatWrapRef.value = el;
    }



    return {
        chatWrapRef,
        stomp,
        socketRoom,
        socketUser,
        messages,
        updateMessage,
        deleteMessage,
        myComplaintMessage,
        updateSocketRoom,
        updateSocketUser,
        setRefElement,
        // initStompClient,
        // isEqualUuid,
        // scrollToBottom,
        // clearStompClient,
    }
})