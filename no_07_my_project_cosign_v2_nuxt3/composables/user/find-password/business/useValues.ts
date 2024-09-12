import type { FindPasswordInputs } from "./_types";

export const useValues = () => {
    const findPasswordValue = reactive<FindPasswordInputs>({
        email: {
            id: 'email',
            value: '',
            label: '이메일',
            placeholder: '이메일을 입력해 주세요.',
            errors: {
                rule: {
                    label: '이메일 형식이 유효하지 않습니다.',
                    flag: false,
                },
            },
            setValue: (value: any) => {
                findPasswordValue.email.value = value;
            }
        },
    })

    return {
        findPasswordValue
    }
}