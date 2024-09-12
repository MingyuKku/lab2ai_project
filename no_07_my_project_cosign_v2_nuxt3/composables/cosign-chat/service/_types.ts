// import type { NuxtError } from "#app";
import type { _AsyncData } from "~/composables/_api/_types";
import type { ChatRoom, ChatUser, IMessageBody, MessagePermission, MessageType, MessageUIType } from "~/pinia/cosign-chat/_types";


// export type ChatRoomPromiseSettledResult = PromiseSettledResult<_AsyncData<ChatRoom | null, NuxtError<unknown> | null>>;
// export type ChatUserPromiseSettledResult = PromiseSettledResult<_AsyncData<ChatUser | null, NuxtError<unknown> | null>>;
export type ChatRoomPromiseSettledResult = PromiseSettledResult<ChatRoom | null>;
export type ChatUserPromiseSettledResult = PromiseSettledResult<ChatUser | null>;




export interface ChatHistoryRes {
    is_last_message: boolean;
    message_history: MessageHistory[];
    isVisibilitychange?: boolean; // 브라우저 비활성화에서 활성화로 바뀔때 최신 채팅 히스토리를 받아오기 위한 용도
}

export interface ChatHistoryInstance {
    is_last_message: boolean;
    message_history: ClassMessageHistory[];
    isVisibilitychange?: boolean; // 브라우저 비활성화에서 활성화로 바뀔때 최신 채팅 히스토리를 받아오기 위한 용도
}


export interface MessageHistory extends Omit<IMessageBody, 'uiType'> {};

export class ClassMessageHistory {
    input_date_time: string;
    date_format: string;
    message: string;
    message_id: number;
    message_type: MessageType;
    permission: MessagePermission;
    room_uuid: string;
    user_nickname: string;
    user_uuid: string;
    uiType: MessageUIType;
    constructor(res: MessageHistory, isEqualUuid: (user_uuid: string) => boolean, dateFormat: Intl.DateTimeFormat) {
        this.input_date_time = res.input_date_time;
        this.date_format = dateFormat.format(Date.parseUtcToLocal(res.input_date_time));
        this.message = res.message;
        this.message_id = res.message_id;
        this.message_type = res.message_type;
        this.permission = res.permission;
        this.room_uuid = res.room_uuid;
        this.user_nickname = res.user_nickname;
        this.user_uuid = res.user_uuid;
        this.uiType = isEqualUuid(res.user_uuid) ? 'my' : 'others';
    }
}

export interface GroupbyDateMessageHistory {
    titleDate: string | null;
    historyItems: ClassMessageHistory[];
}
export class ClassGroupbyDateMessageHistory {
    public groupbyDateMessageHistory: GroupbyDateMessageHistory[];

    constructor(res: ClassMessageHistory[], key: keyof Pick<ClassMessageHistory, 'date_format'>) {

        // const checkMessageDate = (oldDate: string | null, newDate: string) => oldDate === newDate;

        const groupbyDate = (): {[key: string]: GroupbyDateMessageHistory} => {
            
            // console.log('헷', lastOldMessageDate)
            return res.reduce<Record<string, GroupbyDateMessageHistory>>((prev, cur) => {
                
                const dateValue = cur[key];
    
                if (!prev[dateValue]) {
                    prev[dateValue] = {
                        // titleDate: checkMessageDate(lastOldMessageDate, dateValue) ? null : dateValue,
                        titleDate: dateValue,
                        historyItems: []
                    }
                }
    
                prev[dateValue].historyItems.push(cur);
          
                return prev;
            }, {})
        }

        this.groupbyDateMessageHistory =  Object.values(groupbyDate());
    }
}


export type ReturnMessageDelete = {
    hide: number;
}


export type ReturnMessageComplaint = {
    report: number;
}