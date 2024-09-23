import { DefaultRes, ReturnSuccess } from "../_fetch/_types"
import { returnFetch } from "../_fetch"
import { SignupParams } from "./_types"

export const useFetchSignup = () => {
    const signup = async (params: SignupParams): Promise<ReturnSuccess> => {
        const res = await returnFetch<DefaultRes>(`sign-up`, {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        
        console.log('가입 응답', res)
        if (!res) return {
            isSuccess: 'fail'
        }

        // const loginUser: LoginUserRes = res.data.login;
        // console.log('로그인 유저', loginUser)
        
        

        return {
            isSuccess: 'success'
        }
    }

    return {
        signup
    }
}