import type { ReturnSuccess } from "../../mypage/service/_types";

export const useFetchFindPassword = async (email: string): Promise<ReturnSuccess> => {

    const { $serviceContentApiFetch } = useNuxtApp();
    
    const params = {
        username: email
    }

    try {
        await $serviceContentApiFetch('user/find/password', {
            method:'POST',
            credentials: 'include',
            body: Object.getParams(params)
        })

        return {
            message: 'success'
        }

    } catch (err) {
        return {
            message: 'fail'
        }
    }
}