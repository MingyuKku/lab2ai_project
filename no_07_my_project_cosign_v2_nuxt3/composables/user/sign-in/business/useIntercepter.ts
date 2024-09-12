import type { ErrorCode } from "~/composables/_api/_types";
import { piniaAlert } from "~/pinia/popup/piniaAlert";
import { piniaPopup } from "~/pinia/popup/piniaPopup";

export function useIntercepter() {

    const signinResponseError = ({response}:{response: any}) => {
        const { error }:{error: ErrorCode} = response._data;

        const { togglePopupFlag } = piniaPopup();
        const { setAlertValue, hiddenAlert } = piniaAlert();

        togglePopupFlag(true);
        setAlertValue({
            description: error.message,
            buttons: {
                center: {
                    type: 'OK',
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
        signinResponseError
    }
}