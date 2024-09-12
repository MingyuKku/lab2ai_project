import { serviceAxios } from "_fetch/service";
import { ChatGroup, ChatListClass, ChatListData, ChatMessageGroup, ChatRes, ChatRoomDetail, chatTimeFormat, chatTimeFormatGetTime, MemberDetail, MessageListType, NewAccumulate, Type } from "./_types";


/**
 * @returns 채팅방 정보
 */
export async function getRoomsInfo(member_se: number, character_se: number | string):Promise<ChatRoomDetail | null> {
    try {
        const { data } = await serviceAxios().get(`room/${member_se},${character_se}`);
        
        const { chatRoomDetail }: {chatRoomDetail: ChatRoomDetail} = data;
        if (
            data &&
            data.chatRoomDetail
        ) {
            return chatRoomDetail;
            
        } else {
            return null;
        }

    } catch (err) {
      return null;
    }
}



/**
 * @returns 채팅 목록
 */
export async function getChatList(
    member_se: number,
    character_se: number | string | undefined,
    id: string,
    size: number = 5,
):Promise<ChatListData | null> {
    if (!character_se) return null;
    
    try {
        const { data } = await serviceAxios().get(`rooms/${member_se},${character_se},${id},${size}`);
        if (
            data &&
            data.chatList &&
            data.chatList.length > 0
        ) {
            const chatRes: ChatRes = data;
            // console.log('채팅 목록', chatRes)

            const newChatGroup = createChatGroup(chatRes.chatList.map(chat => new ChatListClass(chat)));
            return {
                chatList: newChatGroup,
                flag: chatRes.flag
            }
            // return {
            //     chatList: createChatGroup(chatRes.chatList.map(chat => new ChatListClass(chat))),
            //     flag: chatRes.flag
            // }
            
        } else {
            return null;
        }

    } catch (err) {
        return null;
    }
}

const createChatGroup = (list: ChatListClass[]): ChatGroup[] => {
    const result = list.reduce((acc, cur) => {
        const keyDate = cur.timeText;
        
        const newAcc: NewAccumulate = {...acc};
        if (newAcc[keyDate] === undefined) {
            newAcc[keyDate] = {
                date: keyDate,
                dateTimestamp: new Date(cur.reg_dt).getTime(),
                chats: []
            }
        }

        newAcc[keyDate].chats.push({
            ...cur
        });

        newAcc[keyDate].chats.sort((prev, next) => prev.chatTimestamp - next.chatTimestamp); // 날짜순으로 오름차순

        return newAcc;
    }, {})

    const valuesArray = Object.values<ChatGroup>(result);
    valuesArray.sort((prev, next) => (prev.dateTimestamp ?? 0) - (next.dateTimestamp ?? 0));

    return valuesArray;
}


// const createChatGroup = (list: ChatListClass[]): ChatMessageGroup[] => {

//     const getGroupby = (): ChatGroup[] => {
//         const result = list.reduce((acc, cur) => {

//             const key = cur.timeText;
//             const newAcc: NewAccumulate = acc;

//             if (!newAcc[key]) {
//                 newAcc[key] = {
//                     date: null,
//                     chats: []
//                 };

//                 if (!newAcc[key].date) {
//                     newAcc[key].date = cur.timeText;
//                     newAcc[key].chats = [];
//                 }
//             }

//             newAcc[key].chats.push({
//                 ...cur
//             })

//             return newAcc;
//         }, {})

//         return Object.values<ChatGroup>(result);
//     }
    
//     const chatGroup = getGroupby();

//     return chatGroup.map(chat => ({
//         date: chat.date,
//         chatMessages: getMessageList(chat.chats)
//     })).reverse()
// };

// const getMessageList = (list: ChatListClass[]): MessageListType[] => {
//     let newList: MessageListType[] = [];

//     const pushItem = (type: Type, data: ChatListClass) => {

//         newList.push({
//             type: type,
//             text: type === 'chatBot' ? data.message : data.answer,
//             timeText: chatTimeFormat(data.reg_dt),
//             timestamp: new Date(data.reg_dt).getTime(),
//             timestampFormat: chatTimeFormatGetTime(data.reg_dt),
//             id: data.id
//         });
//     }

//     list.forEach(lt => {
//         pushItem('user', lt);
//         pushItem('chatBot', lt);
//     });

//     newList = newList.sort((prev, next) => prev.timestamp - next.timestamp)

//     return newList;
// }

/**
 * 채팅을 어디까지 읽었다는 것을 서버에 알려주기 위해 호출
 * @param member_se 
 * @param character_se 
 * @param id 
 */
export async function chatRead(
    member_se: number,
    character_se: number | string,
    chat_id: string | null,
):Promise<any | null> {
    if (!chat_id) return;
    
    try {
        const { data } = await serviceAxios().post(`chat/read`, {
            member_se,
            character_se,
            chat_id
        });

        // console.log('읽었다 응답', data)

    } catch (err) {
        return null;
    }
}


/**
 * 채팅 신고(피드백)
 * @param member_se 
 * @param character_se 
 * @param id
 * @param type_cd
 * @param etc_ct
 */
export async function chatFeedback(
    member_se: number,
    character_se: number | string,
    chat_id: string,
    type_cd: number,
    etc_ct?: string,
):Promise<any | null> {
    try {

        const params = etc_ct ? {
            member_se,
            character_se,
            chat_id,
            type_cd,
            etc_ct
        } : {
            member_se,
            character_se,
            chat_id,
            type_cd,
        }

        const { data } = await serviceAxios().post(`member/feedback`, params);

        console.log('피드백!', data)

    } catch (err) {
        return null;
    }
}

