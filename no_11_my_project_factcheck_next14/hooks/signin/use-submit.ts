import React from "react";
import { useRouter } from "next/navigation";
import { LoginParams } from "@/services/auth/_types";
import { useFetchSignin } from "@/services/auth/use-fetch-signin";

export const useSubmit = (setIsTwoFactorAuth: React.Dispatch<React.SetStateAction<boolean>>) => {

    const { signin } = useFetchSignin();
    const { replace } = useRouter();
    
    const onSubmitSignin = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setIsTwoFactorAuth(true);
        

        const formData = new FormData(e.currentTarget);
        const userId = formData.get('id') as string;
        const userPw = formData.get('pw') as string;
    
        const params: LoginParams = {
            username: userId,
            password: userPw,
        }
        
        const { isSuccess } = await signin(params);
        if (isSuccess === 'success') {
            setIsTwoFactorAuth(true);
        }
        // else alert('아이디, 비밀번호가 잘못되었습니다.');
    
    }, [])

    return {
        onSubmitSignin,
    }
}

