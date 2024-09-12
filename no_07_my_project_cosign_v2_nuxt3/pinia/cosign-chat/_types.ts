import type { CompatClient } from "@stomp/stompjs";

const messageType = ['IN', 'TALK', 'OUT'] as const; // 입장, 대화, 퇴장
const messagePermission = ['DEFAULT', 'BASIC', 'PREMIUM', 'ADMIN'] as const; // 권한없음, 베이직 이용권, 프리미엄 이용권, 관리자

export type MessageType = typeof messageType[number];
export type MessagePermission = typeof messagePermission[number];


export interface ChatRoom {
    room_uuid: string; // 방 아이디
    room_name: string; // 채팅방 이름
    inactive: boolean; // 비활성 여부
}

export interface ChatUser {
    user_uuid: string;
    user_nickname: string;
    permission: MessagePermission;
}


const messageUIType = [ 'my', 'others' ] as const; // 나, 타인
export type MessageUIType = typeof messageUIType[number];
export interface IMessageBody extends ChatUser, Pick<ChatRoom, 'room_uuid'> {
    message_id: number;
    message: string;
    message_type: MessageType;
    uiType: MessageUIType;
    input_date_time: string;
}

export interface StompInstance {
    client: CompatClient | null;
    reconnectAttempts: number; // 재시도 횟수
    reconnectInterval: number; // 재시도 대기 시간
    readonly maxReconnectAttempts: 5; // 최대 재연결 시도 횟수
}
