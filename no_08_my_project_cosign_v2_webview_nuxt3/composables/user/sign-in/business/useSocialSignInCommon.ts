import { useAuthTokenCookies } from "~/composables/useCookie/auth-token";
import { piniaAuthInfoValues } from "~/pinia/user/piniaAuthInfoValues";
import { useRedirectPage } from "./useRedirectPage";
import { piniaPopup } from "~/pinia/popup/piniaPopup";
import { piniaAlert } from "~/pinia/popup/piniaAlert";

export const useSocialSignInCommon = () => {

    const { setAlertValue, hiddenAlert } = piniaAlert();
    const { togglePopupFlag } = piniaPopup();

    const onAfterLogin = async (accessToken: string) => {
        const { setAccToken } = useAuthTokenCookies();
        setAccToken(accessToken);
        // accTokenCookie().value = accessToken;
    
        await nextTick(); // acc 쿠키에 데이터가 들어가기까지 대기
    
        // const { setIsLogin } = usePiniaIsLogin();
    
        // setIsLogin(true);
        // redirectRouter();

        const { updateAuthState } = piniaAuthInfoValues();
        updateAuthState({
            isUserSignedIn: true,
        })
        // clearNuxtData() // 모든 캐시된 넉스트데이타(asyncData) 제거
        
        useRedirectPage();
    }


    const showMergeAccountDialog = <T>(onMerge: (arg: T) => void, arg: T) => {

        togglePopupFlag(true);

        setAlertValue({
            description: [
                '이미 동일한 이메일로 가입하신 이력이 있습니다.',
                '기존 아이디에 소셜 로그인 사용하실 수 있도록 추가해 드릴까요?'
            ],
            buttons: {
                left: {
                    label: '확인',
                    onClick: () => {
                        onMerge(arg);
                    }
                },
                right: {
                    label: '취소',
                    onClick: () => {
                        togglePopupFlag(false);
                        hiddenAlert();

                        //기존 가입하셨던 이메일 아이디를 계속 이용하실 수 있습니다.
                        showNotMergeAccountDialog();
                    }
                }
            }
        })
    }

    const showNotMergeAccountDialog = () => {
        
        setAlertValue({
            description: '기존에 가입하셨던 이메일 아이디를 계속 이용하실 수 있습니다.',
            buttons: {
                center: {
                    label: '확인',
                    onClick: () => {
                        togglePopupFlag(false);
                        hiddenAlert();
                    }
                }
            }
        })
    }


    return {
        onAfterLogin,
        showMergeAccountDialog,
    }
}