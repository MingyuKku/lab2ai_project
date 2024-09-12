import type { BasicRes } from "~/composables/_api/_types";
import { jwtDecode } from "~/composables/_auth/_methods";
import { useAuthTokenCookies } from "~/composables/useCookie/auth-token";
import type { ChatUser } from "~/pinia/cosign-chat/_types";

export const useRefetchChatUser = async (): Promise<ChatUser | null> => {
    const { $serviceContentApiFetch } = useNuxtApp();
    const { getAccToken } = useAuthTokenCookies();
    const token = getAccToken();
    const decode = token.value ? jwtDecode(token.value) : null;
    
    try {

        if (!decode?.id) return null;
        
        const { data }:{data: ChatUser} = await $serviceContentApiFetch<BasicRes>(`chat/user/info/${decode.id}`);
        return data;

    } catch (err) {
        return null;
    }
}