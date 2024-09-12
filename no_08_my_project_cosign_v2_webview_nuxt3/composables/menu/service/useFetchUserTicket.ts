import type { BasicRes } from "~/composables/_api/_types";
import type { UserInfo } from "./_types";
import { piniaAuthInfoValues } from "~/pinia/user/piniaAuthInfoValues";

export const useFetchUserTicket = () => {

    const getUserTicket = async (key?: string): Promise<UserInfo | null> => {

        const { $serviceContentApiFetch } = useNuxtApp();
        const { isUserSignedIn } = piniaAuthInfoValues();

        if (!isUserSignedIn) return null;
        
        try {
            if (key) {
                const { data: cache } = useNuxtData(key);
                if (cache.value) return cache.value;
            }
            

            const { data } = await $serviceContentApiFetch<BasicRes>('common/user-info', {
                method: 'POST',
                credentials: 'include'
            });

            if (!data || !data.userInfo) return null;

            const { userInfo }:{userInfo: UserInfo} = data;
            return userInfo;

        } catch (err) {
            return null;
        }
    }

    return {
        getUserTicket
    }
}