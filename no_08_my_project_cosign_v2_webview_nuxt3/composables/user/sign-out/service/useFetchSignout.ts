import type { AuthRes } from "~/composables/_api/_types";
import type { Options } from "~/plugins/api";
import type { DeviceType } from "./_types";
import { useSignOut } from "../business/useSignOut";

export function useFetchSignout() {
    
    const { $authApiFetch } = useNuxtApp();
    
    const signout = async (deviceType: DeviceType = 'WEB'): Promise<any> => {
        
        const { go } = useRouter();
        
        try {

            const params = {
                deviceType,
            }
            const option: Options = {
                method: 'POST',
                credentials: 'include',
                body: Object.getParams(params),
            }

            $authApiFetch<AuthRes>(`user/logout`, option)
            .then(() => {
                const { deleteAuthData } = useSignOut();
                deleteAuthData();
                go(0);
            })
            
            
        } catch (err) {

        }
    }

    return {
        signout
    }
}