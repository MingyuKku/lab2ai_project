import { CheckItemNames, type CheckItemNamesType, type SignupAgreeList, type SignupInputs } from "./_types"

export const useSignupData = () => {

    const signupInputs = reactive<SignupInputs>({
        nickname: {
            id: 'nickname',
            value: '',
            label: '닉네임',
            placeholder: '닉네임을 입력해 주세요.',
            tips: '한글/영문/숫자 포함 2~10자',
            errors: {
                inUse: {
                    label: '이미 사용 중인 닉네임입니다.',
                    flag: false,
                },
                rule: {
                    label: '한글/영문/숫자 포함 2~10자리 입력해 주세요.',
                    flag: false,
                },
            },
            setValue: (value: any) => {
                signupInputs.nickname.value = value;
            }
        },
        email: {
            id: 'email',
            value: '',
            label: '이메일',
            placeholder: '이메일을 입력해 주세요.',
            errors: {
                inUse: {
                    label: '이미 가입된 이메일입니다.',
                    flag: false,
                },
                rule: {
                    label: '이메일 형식이 유효하지 않습니다.',
                    flag: false,
                },
            },
            setValue: (value: any) => {
                signupInputs.email.value = value;
            }
        },
        password: {
            id: 'password',
            value: '',
            label: '비밀번호',
            tips: '영문/숫자/특수문자 중 2개 이상 포함 8~20자',
            placeholder: '비밀번호를 입력해 주세요.',
            errors: {
                rule: {
                    label: '영문/숫자/특수문자 중 2가지 이상 포함 8~20자 이상 입력해 주세요.',
                    flag: false,
                },
            },
            setValue: (value: any) => {
                signupInputs.password.value = value;
            }
        },
        passwordCheck: {
            id: 'password-check',
            value: '',
            placeholder: '비밀번호를 한 번 더 입력해 주세요.',
            errors: {
                rule: {
                    label: '비밀번호가 일치하지 않습니다.',
                    flag: false,
                },
            },
            setValue: (value: any) => {
                signupInputs.passwordCheck.value = value;
            }
        }
    })



    const signupAgreeList = reactive<SignupAgreeList>({
        items: [
            {
                name: 'age',
                label: '만 19세 이상입니다.',
                flag: false,
                required: true,
            },
            {
                name: 'service',
                label: '서비스 이용약관에 동의합니다.',
                flag: false,
                required: true,
                href: `/policy/privacy`
            },
            {
                name: 'private',
                label: '개인정보 수집/이용에 동의합니다.',
                flag: false,
                required: true,
                href: `/policy/service`
            },
            {
                name: 'event',
                label: '이벤트 할인 혜택 알림 수신에 동의합니다.',
                flag: false,
                required: false,
            }
        ],
        checkedItems: [],
    })


    const updateSignupAgreeList = (name: CheckItemNamesType) => {

        const checkNames = signupAgreeList.checkedItems.findIndex(item => item === name);
        
        if (checkNames > -1) signupAgreeList.checkedItems.splice(checkNames, 1);
        else signupAgreeList.checkedItems.push(name);
    }

    const toggleSignupAgreeListAllCheck = () => {
        if (signupAgreeList.checkedItems.length < CheckItemNames.length) signupAgreeList.checkedItems = [ 'age', 'service', 'private', 'event' ];
        else signupAgreeList.checkedItems = [];
    }


    /**
     * @returns 모든 필수 동의에 체크가 되어 있으면 true 반환
     */
    const isAllRequiredChecked = () => {
        const required = signupAgreeList.items.filter(item => item.required);

        return required.every(item => signupAgreeList.checkedItems.includes(item.name));
    }

    return {
        signupInputs,
        signupAgreeList,
        updateSignupAgreeList,
        toggleSignupAgreeListAllCheck,
        isAllRequiredChecked,
    }
}