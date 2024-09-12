import { formatDate } from "utils";

export interface ChatRoomDetail {
    character_en_nm: string; // 캐릭터 영문 이름
    character_nm: string; // 캐릭터 이름
    character_se: number; // 캐릭터 일련번호
    dday: number; // 캐릭터와 함께한 날
    member_se: number; // 회원 일련번호
    porofile_thumbnail_lk: string; // 캐릭터 프로필 링크
    subscribe_yn: number; // 구독여부(1: 구독, 2: 미구독)
}

export interface MemberDetail {
    birth_ds: string; // 생년월일
    job_cd: number; // 직업
    nick_nm1: string; // 닉네임(성)
    nick_nm2: string; // 닉네임(이름)
    sex_cd: number; // 성별
}

export interface ChatRes {
    flag: boolean;
    chatList: ChatList[];
}

interface ChatList {
    answer: string; // 유저 채팅 내용
    character_se: number; // 캐릭터 일련번호
    id: string; // 채팅 id값
    member_se: number; // 회원 일련번호
    message: string; // 캐릭터 채팅 내용
    reg_dt: string; // 채팅 시간
}

export class ChatListClass {
    answer: string | null;
    character_se: number;
    id: string | null;
    member_se: number;
    message: string | null;
    reg_dt: string;
    timeText: string;
    chatTimeText: string;
    chatTimestamp: number;
    chatTimestampFormat: number;
    constructor(res: ChatList) {
        this.answer = res.answer;
        this.character_se = res.character_se;
        this.id = res.id;
        this.member_se = res.member_se;
        this.message = res.message;
        this.reg_dt = res.reg_dt;
        this.timeText = chatTimeFormatText(res.reg_dt);
        this.chatTimeText = chatTimeFormat(res.reg_dt);
        this.chatTimestamp = new Date(res.reg_dt).getTime();
        this.chatTimestampFormat = chatTimeFormatGetTime(res.reg_dt);
    }
}

export const chatTimeFormat = (date?: string) => {
    const now = date ? Date.parseUtcText(date) : new Date();
    return formatDate(now, 'HH:mm');

    // return new Intl.DateTimeFormat('ko', {
    //     hour: '2-digit',
    //     hourCycle: 'h24',
    //     minute: '2-digit'
    // }).format(date ? new Date(date) : new Date())
}

export const chatTimeFormatText = (time?: string) => {
    const now = time ? Date.parseUtcText(time) : new Date();

    return formatDate(now, 'M월 d일');
    // return new Intl.DateTimeFormat('ko', {
    //     month: 'narrow',
    //     day: 'numeric'
    // }).format(time ? new Date(time) : new Date())
}

export const chatTimeFormatGetTime = (time?: string) => {
    const now = time ? Date.parseUtcText(time) : new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const dateOnly = new Date(year, month, day);

    return dateOnly.getTime();
}


export type Type = "user" | "chatBot";
export interface MessageListType {
    type: Type;
    text: string;
    timeText: string;
    timestamp: number;
    timestampFormat: number;
    id?: string;
    tempId?: string;
}

export interface NewAccumulate {
    [key: string]: {
        date: string | null;
        dateTimestamp: number;
        chats: ChatListClass[];
    }
}

export interface ChatGroup {
    date: string | null;
    chats: ChatListClass[];
    dateTimestamp?: number;
}

export interface ChatMessageGroup {
    date: string | null;
    chatMessages: MessageListType[];
}

// export interface ChatListData {
//     flag: boolean;
//     chatList: ChatMessageGroup[];
// }

export interface ChatListData {
    flag: boolean;
    chatList: ChatGroup[];
}