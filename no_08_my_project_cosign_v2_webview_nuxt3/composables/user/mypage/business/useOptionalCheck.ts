import type { MypageInputs } from "./_types";

interface Props {
    isEmailRegistered: boolean;
    mypage: MypageInputs;
}


export const useOptionalCheck = ({ isEmailRegistered, mypage }: Props) => {
    /**
     * 유저의 이메일이 등록되었는지를 체크해 이메일 에러 객체를 옵셔널하게 생성함
     */
    const checkEmailRegisteredAndCreateOptionalEmailErrors = () => isEmailRegistered ? undefined : { emailErrors: mypage.email.errors };

    /**
     * 유저의 이메일이 등록되었는지를 체크해 유저 정보 업데이트하는 fetch 함수의 파라미터를 옵셔널하게 생성
     */
    // const checkEmailRegisteredAndOptionalUserInfoUpdateFetchParams = () => isEmailRegistered ? { optionalUsername: mypage.email.value } : undefined;
    const checkEmailRegisteredAndOptionalUserInfoUpdateFetchParams = () => {
        if (!mypage.email.disabled) {
            return { optionalUsername: mypage.email.value }
        }
        // if (isEmailRegistered) {
        //     return { optionalUsername: mypage.email.value }
        // }
    };


    return {
        checkEmailRegisteredAndCreateOptionalEmailErrors,
        checkEmailRegisteredAndOptionalUserInfoUpdateFetchParams,
    }
}