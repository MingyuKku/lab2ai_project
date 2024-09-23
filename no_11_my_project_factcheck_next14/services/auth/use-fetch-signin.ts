import { returnFetch } from "../_fetch";
import { DefaultRes, ReturnSuccess } from "../_fetch/_types";
import { LoginParams, LoginUserRes, TwofaParams } from "./_types";
import { useCsrfToken } from "@/context/CSRF-token-provider";

export const useFetchSignin = () => {
    
    /**
     * 2차 인증 이메일 전송 api
     */
    const request2faAuthentication = async (): Promise<ReturnSuccess> => {
        const res = await returnFetch<DefaultRes>(`2fa/sign-in`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        })

        if (!res?.data) return {
            isSuccess: 'fail'
        }

        return {
            isSuccess: 'success'
        }
    }


    const signin = async (user: LoginParams): Promise<ReturnSuccess> => {

        const res = await returnFetch<DefaultRes>(`sign-in`, {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        })

        if (!res?.data) return {
            isSuccess: 'fail'
        }
        

        const { isSuccess } = await request2faAuthentication();

        if (isSuccess === 'fail') return {
            isSuccess: 'fail'
        }

        // const loginUser: LoginUserRes = res.data.login;
        // console.log('로그인 유저', loginUser)
        
        

        return {
            isSuccess: 'success'
        }
    }

    const signout = async (): Promise<ReturnSuccess> => {

        const res = await returnFetch<DefaultRes>(`logout`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        
        if (!res) return {
            isSuccess: 'fail'
        }

        return {
            isSuccess: 'success'
        }
    }
    

    const response2faAuthentication = async (number: TwofaParams): Promise<ReturnSuccess> => {

        const res = await returnFetch<DefaultRes>(`2fa/validate`, {
            method: 'post',
            body: JSON.stringify(number),
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        })

        if (!res?.data) return {
            isSuccess: 'fail'
        }

        return {
            isSuccess: 'success'
        }
    }


    return {
        signin,
        signout,
        response2faAuthentication,
    }

}