import type { MypageUserInfo } from "../service/_types";
import type { MypageInputs } from "./_types";

export const useMypageValues = () => {
    const mypage = reactive<MypageInputs>({
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
                mypage.nickname.value = value;
            }
        },
        email: {
            id: 'email',
            value: '',
            label: '이메일',
            placeholder: '이메일을 추가해 주세요.',
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
                mypage.email.value = value;
            }
        },
        oldPassword: {
            id: 'old-password',
            value: '',
            label: '기존 비밀번호',
            placeholder: '기존 비밀번호를 입력해 주세요.',
            errors: {
                wrong: {
                    label: '기존 비밀번호가 틀렸습니다.',
                    flag: false,
                },
                rule: {
                    label: '비밀번호 구성이 옳바르지 않습니다.',
                    flag: false,
                },
            },
            setValue: (value: any) => {
                mypage.oldPassword.value = value;
            }
        },
        newPassword: {
            id: 'new-password',
            value: '',
            label: '새 비밀번호',
            tips: '영문/숫자/특수문자 중 2개 이상 포함 8~20자',
            placeholder: '새 비밀번호를 입력해 주세요.',
            errors: {
                rule: {
                    label: '영문/숫자/특수문자 중 2가지 이상 포함 8~20자 이상 입력해 주세요.',
                    flag: false,
                },
                same: {
                    label: '기존에 사용한 비밀번호와 동일합니다.',
                    flag: false,
                }
            },
            setValue: (value: any) => {
                mypage.newPassword.value = value;
            }
        },
        newPasswordCheck: {
            id: 'new-password-check',
            value: '',
            label: '새 비밀번호 확인',
            placeholder: '비밀번호를 한 번 더 입력해 주세요.',
            errors: {
                rule: {
                    label: '비밀번호가 일치하지 않습니다.',
                    flag: false,
                },
            },
            setValue: (value: any) => {
                mypage.newPasswordCheck.value = value;
            }
        }
    })

    const eventCk = ref(false);

    const isEmailRegistered = ref(true);
    const isPasswordExist = ref(true);


    const initMypageValues = (data: MypageUserInfo | null) => {
        if (!data) return;

        mypage.nickname.value = data.nickName;
        mypage.email.value = data.email;
        eventCk.value = data.eventCk;

        // 이메일이 없으면 => 이메일을 추가할 수 있도록
        // 이메일이 존재하면 => 이메일을 수정할 수 없도록
        mypage.email.disabled = data.email ? true : false;
        isEmailRegistered.value = data.email ? true : false;

        // 기존 패스워드가 있으면 isPasswordExist값은 true
        isPasswordExist.value = !data.passwordNull ? true : false;
    }

    const updateEventCk = (value: boolean) => {
        eventCk.value = value;
    }

    return {
        mypage,
        eventCk,
        isEmailRegistered,
        isPasswordExist,
        initMypageValues,
        updateEventCk
    }
}