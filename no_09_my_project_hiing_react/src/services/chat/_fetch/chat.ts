import { serviceAxios } from "_fetch/service";



/**
 * @returns 채팅방 목록
 */
export async function getRoomsList(member_se: number):Promise<ChatRoomListClass[] | null> {
    try {
        const { data } = await serviceAxios().get(`rooms/${member_se}`);

        if (
            data &&
            data.chatRoomList &&
            data.chatRoomList.length >= 0
        ) {
            const { chatRoomList }: {chatRoomList: ChatRoomListClass[]} = data;

            const instance = chatRoomList.map(item => new ChatRoomListClass(item));
            instance.sort((prev, next) => new Date(next.last_chat_time).getTime() - new Date(prev.last_chat_time).getTime())
            return instance;

        } else {
            return null;
        }

    } catch (err) {
      return null;
    }
}


export interface ChatRoomListType {
    character_nm: string; // 캐릭터 이름
    character_se: number; // 캐릭터 일련번호
    last_chat: string; // 마지막 채팅 내용
    last_chat_time: string; // 마지막 채팅 시간
    porofile_thumbnail_lk: string; // 프로필 이미지 링크
    redDot: boolean; // 레드닷(true: 활성화, false: 비활성화)
}


export class ChatRoomListClass {
    character_nm: string;
    character_se: number;
    last_chat: string;
    last_chat_time: string;
    last_chat_time_format: string;
    porofile_thumbnail_lk: string;
    redDot: boolean;
    constructor(res: ChatRoomListType) {

        function transFormat(time: string) {
            const timeFormat = new Intl.DateTimeFormat('ko', {
                hour: '2-digit',
                hourCycle: 'h24',
                minute: '2-digit',
            }).format(new Date(time))

            return timeFormat;
        }

        this.character_nm = res.character_nm;
        this.character_se = res.character_se;
        this.last_chat = res.last_chat;
        this.last_chat_time = res.last_chat_time;
        this.last_chat_time_format = transFormat(res.last_chat_time);
        this.porofile_thumbnail_lk = res.porofile_thumbnail_lk;
        this.redDot = res.redDot;
    }
}


