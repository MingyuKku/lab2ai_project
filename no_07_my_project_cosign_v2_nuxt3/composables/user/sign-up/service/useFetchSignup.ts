import type { BasicRes, intercepterContext } from "~/composables/_api/_types";
import type { SignupParams, SocialSignUpParams } from "./_types";
import type { SignupInputerrors } from "../business/_types";
import { useFetchAuthInterceptor } from "~/composables/_api/useFetchAuthInterceptor";
import { useIntercepter } from "../../sign-in/business/useIntercepter";
import { piniaAuthInfoValues } from "~/pinia/user/piniaAuthInfoValues";
import type { Options } from "~/plugins/api";
import type { ReturnSuccess } from "../../mypage/service/_types";


interface Props {
    nicknameErrors?: SignupInputerrors;
    emailErrors?: SignupInputerrors;
    passwordErrors?: SignupInputerrors;
}


export const useFetchSignup = ({
    nicknameErrors,
    emailErrors,
    passwordErrors
}: Props) => {
    const { $serviceContentApiFetch } = useNuxtApp();

    const { onAuthorizationResponse } = useFetchAuthInterceptor();
    const { updateAuthState } = piniaAuthInfoValues();

    const onResponseSignupError = (context: intercepterContext): Promise<void> | void => {
        
        const { _data } = context.response;
        const { error } = _data;

        if (nicknameErrors) {
            if (error.errorName === 'USER_SAME_NICKNAME_EXIST') {
                if (!nicknameErrors.inUse) return;
                nicknameErrors.inUse.flag = true;
            }
        }
        
        if (emailErrors) {
            if (error.errorName === 'USER_INCORRECT_NICKNAME') {
                emailErrors.rule.flag = true;
            }
            if (error.errorName === 'USER_ALREADY_EXIST') {
                if (!emailErrors.inUse) return;
                emailErrors.inUse.flag = true;
            }
        }
        

        if (passwordErrors) {
            if (error.errorName === 'USER_INCORRECT_PASSWORD') {
                passwordErrors.rule.flag = true;
            }
        }
    }


    const signup = async (params: SignupParams): Promise<ReturnSuccess> => {
        try {
            await $serviceContentApiFetch<BasicRes>('user/sign-up', {
                method: 'POST',
                credentials: 'include',
                body: Object.getParams(params),
                onResponse: onAuthorizationResponse,
                onResponseError: onResponseSignupError
            })

            updateAuthState({
                isUserSignedIn: true,
            })
            // clearNuxtData() // 모든 캐시된 넉스트데이타(asyncData) 제거

            return {
                message: 'success'
            }

        } catch (err) {
            return {
                message: 'fail'
            }
        }
    }


    const socialSignup = async ({ loginResponse, event, socialLoginType }: SocialSignUpParams): Promise<ReturnSuccess> => {
        const { $serviceContentApiFetch } = useNuxtApp();

        try {
            const { signinResponseError } = useIntercepter();

            const params: SocialSignUpParams = {
                loginResponse: JSON.stringify(loginResponse),
                event,
                socialLoginType
            }

            const option: Options = {
                method: 'POST',
                credentials: 'include',
                body: Object.getParams(params),
                onResponse: onAuthorizationResponse,
                onResponseError: signinResponseError,
            }

            await $serviceContentApiFetch<BasicRes>(`user/sns/sign-up`, option);

            updateAuthState({
                isUserSignedIn: true,
            })
            // clearNuxtData() // 모든 캐시된 넉스트데이타(asyncData) 제거
            
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
        signup,
        socialSignup,
    }
}