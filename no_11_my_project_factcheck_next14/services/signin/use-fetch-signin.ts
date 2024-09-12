import { returnFetch } from "../_fetch";
import { DefaultRes, ReturnSuccess } from "../_fetch/_types";
import { LoginParams, LoginUserRes } from "./_types";
import { useCsrfToken } from "@/context/CSRF-token-provider";

export const useFetchSignin = () => {
    
    const token = useCsrfToken();

    const signin = async (user: LoginParams): Promise<ReturnSuccess> => {
        
        if (!token) return {
            isSuccess: 'fail'
        }

        const res = await returnFetch<DefaultRes>(`sign-in`, {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        
        if (!res || !res.data) return {
            isSuccess: 'fail'
        }

        const loginUser: LoginUserRes = res.data.login;
        // console.log('로그인 유저', loginUser)
        
        

        return {
            isSuccess: 'success'
        }
    }
    
    return {
        signin,
    }
}