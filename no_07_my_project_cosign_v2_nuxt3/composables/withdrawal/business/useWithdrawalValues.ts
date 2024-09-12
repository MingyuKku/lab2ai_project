import type { WithdrawalInputs } from "./_types";

export const useWithdrawalValues = () => {
    const withdrawal = reactive<WithdrawalInputs>({
        email: {
            id: 'email',
            value: '',
            label: '이메일',
            placeholder: '이메일을 추가해 주세요.',
            setValue: (value: any) => {
                withdrawal.email.value = value;
            },
            disabled: true,
        },
        passwordCheck: {
            id: 'password-check',
            value: '',
            label: '비밀번호 확인',
            placeholder: '비밀번호를 입력해 주세요.',
            errors: {
                rule: {
                    label: '비밀번호가 일치하지 않습니다.',
                    flag: false,
                },
            },
            setValue: (value: any) => {
                withdrawal.passwordCheck.value = value;
            }
        }
    })


    return {
        withdrawal,
    }
    
}