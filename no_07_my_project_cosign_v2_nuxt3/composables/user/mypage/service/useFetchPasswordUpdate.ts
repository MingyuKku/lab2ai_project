import type { intercepterContext } from "~/composables/_api/_types";
import type { ReturnSuccess, UpdatePasswordParams } from "./_types";
import type { SignupInputerrors } from "../../sign-up/business/_types";


interface Props {
    passwordErrors?: SignupInputerrors;
    oldPasswordErrors?: SignupInputerrors;
}

export const useFetchPasswordUpdate = ({passwordErrors, oldPasswordErrors}: Props) => {


    const onResponseUpdateError = (context: intercepterContext): Promise<void> | void => {
        const { _data } = context.response;
        const { error } = _data;

        
        if (passwordErrors && oldPasswordErrors) {
            if (error.errorName === 'USER_SAME_PASSWORD') {
                if (!passwordErrors.same) return;
                passwordErrors.same.flag = true;
            }

            if (error.errorName === 'USER_INCORRECT_PASSWORD') {
                oldPasswordErrors.rule.flag = true;
            }

            if (error.errorName === 'USER_FAIL_PASSWORD') {
                if (!oldPasswordErrors.wrong) return;
                oldPasswordErrors.wrong.flag = true;
            }
        }
    }

    
    
    
    const { $serviceContentApiFetch } = useNuxtApp();

    const addSnsPassword = async (newPwd: string): Promise<ReturnSuccess> => {
        try {
            await $serviceContentApiFetch('my-page/change/sns/password', {
                method: 'POST',
                credentials: 'include',
                body: newPwd,
                onResponseError: onResponseUpdateError,
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


    const updatePassword = async (params: UpdatePasswordParams): Promise<ReturnSuccess> => {
        try {
            await $serviceContentApiFetch('my-page/change/password', {
                method: 'POST',
                credentials: 'include',
                body: Object.getParams(params),
                onResponseError: onResponseUpdateError,
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
        addSnsPassword,
        updatePassword,
    }
}