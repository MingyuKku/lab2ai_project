import { piniaAlert } from "~/pinia/popup/piniaAlert";
import { piniaPopup } from "~/pinia/popup/piniaPopup";

export const useChatAlert = () => {
    const openSigninAlert = (desc: string) => {
        const { togglePopupFlag } = piniaPopup();
        const { setAlertValue, hiddenAlert } = piniaAlert();

        togglePopupFlag(true);
        setAlertValue({
            description: desc,
            buttons: {
                left: {
                    type: 'CANCLE',
                    label: '취소하기',
                    onClick: () => {
                        togglePopupFlag(false);
                        hiddenAlert();
                    }
                },
                right: {
                    type: 'OK',
                    label: '로그인하기',
                    onClick: () => {
                        navigateTo('/user/sign-in');
                    }
                }
            }
        })
    }


    return {
        openSigninAlert,
    }
}