import type { BasicRes } from "~/composables/_api/_types";
import { jwtDecode } from "~/composables/_auth/_methods";
import { useAuthTokenCookies } from "~/composables/useCookie/auth-token";
import type { ChatRoom, ChatUser } from "~/pinia/cosign-chat/_types";
import type { ChatRoomPromiseSettledResult, ChatUserPromiseSettledResult } from "./_types";


// export const useFetchChatInfo = async ({
//     chatRoomKey,
//     chatUserKey,
// }: {
//     chatRoomKey: string;
//     chatUserKey: string;
// }) => {
export const useFetchChatInfo = async () => {

    const room = ref<ChatRoom | null>(null);
    const user = ref<any | null>(null);
    

    const getChatRoom = async (): Promise<ChatRoom | null> => {

        const { $serviceChatApiFetch } = useNuxtApp();
        
        try {
            // const { data: cache } = useNuxtData<ChatRoom>(key);

            // if (cache.value) return cache.value;
            
            const { data }:{data: ChatRoom} = await $serviceChatApiFetch<BasicRes>(`room/open-chat`);
            // console.log('룸 응답', data)
            return data;

        } catch (err) {
            return null;
        }
    }


    const getChatUser = async (user_uuid?: string): Promise<ChatUser | null> => {
        const { $serviceContentApiFetch } = useNuxtApp();
        
        try {
            // const { data: cache } = useNuxtData<ChatUser>(key);

            // if (cache.value) return cache.value;

            if (!user_uuid) return null;
            
            const { data }:{data: ChatUser} = await $serviceContentApiFetch<BasicRes>(`chat/user/info/${user_uuid}`);
            return data;

        } catch (err) {
            return null;
        }
    }


    const initChatRoomData = (res: ChatRoomPromiseSettledResult) => {
        if (res.status !== 'fulfilled') return;

        // const { data } = res.value;
        if (res.value) {
            room.value = res.value;
        }
    }

    const initChatUserData = (res: ChatUserPromiseSettledResult) => {
        if (res.status !== 'fulfilled') return;
        
        // const { data } = res.value;
        if (res.value) {
            user.value = res.value;
        }
    }


    const { getAccToken } = useAuthTokenCookies();
    const token = getAccToken();
    const decode = token.value ? jwtDecode(token.value) : null;

    // clearNuxtData([chatRoomKey, chatUserKey]);
    const [
        res_room,
        res_user
    // ] = await Promise.allSettled([
    //     useAsyncData(chatRoomKey, () => getChatRoom(chatRoomKey)),
    //     useAsyncData(chatUserKey, () => getChatUser(chatUserKey, decode?.id)),
    // ])
    ] = await Promise.allSettled([
        getChatRoom(),
        getChatUser(decode?.id),
    ])
    initChatRoomData(res_room);
    initChatUserData(res_user);
    
    
    return {
        room,
        user,
    }
}