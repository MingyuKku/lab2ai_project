import type { ReturnSuccess } from "~/composables/user/mypage/service/_types";

export const useFetchWithdrawal = () => {

    const { $serviceContentApiFetch } = useNuxtApp();

    const snsWithdrawal = async (): Promise<ReturnSuccess> => {
        try {
            await $serviceContentApiFetch('user/sns/withdrawal', {
                method: 'POST',
                credentials: 'include',
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


    const cosignWithdrawal = async ({
        username,
        password
    }: {
        username: string;
        password: string
    }) => {
        try {
            await $serviceContentApiFetch('user/withdrawal', {
                method: 'POST',
                credentials: 'include',
                body: Object.getParams({
                    username,
                    password
                })
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

    return {
        snsWithdrawal,
        cosignWithdrawal,
    }
}