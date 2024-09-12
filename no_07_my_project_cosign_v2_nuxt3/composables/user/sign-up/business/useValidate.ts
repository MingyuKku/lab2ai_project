import type { SignupInputerrors } from "./_types";

interface Props {
    nicknameErrors?: SignupInputerrors;
    emailErrors?: SignupInputerrors;
    passwordErrors?: SignupInputerrors;
    passwordCheckErrors?: SignupInputerrors;
}

export const useValidate = ({
    nicknameErrors,
    emailErrors,
    passwordErrors,
    passwordCheckErrors,
}: Props) => {


    /**
     * 닉네임 규칙을 검사하는 함수
     * @returns 통과시 true를 반환
     */
    const checkNicknameRule = (value: any) => {
        if (!nicknameErrors) return;
        
        if (value.length < 2 || value.length > 10) {
            nicknameErrors.rule.flag = true;
            return false;
        }

        const isValid = /^[a-zA-Z가-힣0-9]{2,10}$/.test(value);

        if (!isValid) {
            nicknameErrors.rule.flag = true;
            return false;
        }

        nicknameErrors.rule.flag = false;
        return true;
    }


    /**
     * 이메일 규칙을 검사하는 함수
     * @returns 통과시 true를 반환
     */
    const checkEmailRule = (value: any) => {
        if (!emailErrors) return;

        const isValid = /^[^\s@]{2,}@[^\s@]+\.[^\s@]+$/.test(value);
        if (!isValid) {
            emailErrors.rule.flag = true;
            return false;
        }

        emailErrors.rule.flag = false;
        return true;
    }


    /**
     * 비밀번호 규칙을 검사하는 함수
     * @returns 통과시 true를 반환
     */
    const checkPasswordRule = (value: any) => {
        if (!passwordErrors) return;

        // const isValid = /^(?=.*[a-zA-Z\d~!@#$%^&*()_+=])[a-zA-Z\d~!@#$%^&*()_+=]{8,20}$/.test(value);
        const isValid = /^(?:(?=.*[a-zA-Z])(?=.*[\d])|(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+=])|(?=.*[\d])(?=.*[~!@#$%^&*()_+=]))[a-zA-Z\d~!@#$%^&*()_+=]{8,20}$/.test(value);

        if (!isValid) {
            passwordErrors.rule.flag = true;
            return false;
        }

        passwordErrors.rule.flag = false;
        return true;
    }


    /**
     * 비밀번호와 비밀번호 확인이 일치하는지을 검사하는 함수
     * @returns 통과시 true를 반환
     */
    const checkPasswordCheckRule = (value1: any, value2: any) => {
        if (!passwordCheckErrors) return;

        if (value1 !== value2) {
            passwordCheckErrors.rule.flag = true;
            return false;
        }

        passwordCheckErrors.rule.flag = false;
        return true;
    }

    

    return {
        checkNicknameRule,
        checkEmailRule,
        checkPasswordRule,
        checkPasswordCheckRule,
    }
}