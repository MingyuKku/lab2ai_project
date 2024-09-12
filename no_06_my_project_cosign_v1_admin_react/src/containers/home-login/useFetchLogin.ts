import { serviceAxios } from "_api/service";
import { LoginParams, LoginUserRes } from "./_types";
import { DefaultRes, ReturnSuccess } from "_api/_types";

export const useFetchLogin = () => {

    const login = async (user: LoginParams): Promise<ReturnSuccess> => {
        try {
            const { data: res } = await serviceAxios().post<DefaultRes>('/admin/login', Object.getParams(user))

            if (!res) return {
                isSuccess: 'fail'
            }

            const { data } = res;
            const loginUser: LoginUserRes = data.login;
            console.log('로그인 유저', loginUser)

            return {
                isSuccess: 'success'
            }

        } catch (err) {
            return {
                isSuccess: 'fail'
            }
        }
    }


    const logout = async (): Promise<ReturnSuccess> => {
        try {
            const { data: res } = await serviceAxios().post<DefaultRes>('/admin/logout', {})

            if (!res) return {
                isSuccess: 'fail'
            }

            const { data } = res;

            if (!data.logout) return {
                isSuccess: 'fail'
            }

            return {
                isSuccess: 'success'
            }

        } catch (err) {
            return {
                isSuccess: 'fail'
            }
        }

    }



    return {
        login,
        logout,
    }
    
}