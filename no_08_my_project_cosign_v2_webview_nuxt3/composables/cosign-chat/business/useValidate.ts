import { piniaStompSocket } from "~/pinia/cosign-chat/piniaStompSocket";
import { piniaToastMessage } from "~/pinia/toast/piniaToastMessage";
import { useStompSocket } from "./useStompSocket";
import { messageWebview } from "~/composables/_app/useFlutterWebview";
// import { useStompSocket } from "./useStompSocket";

export const useValidate = () => {

    const { setToastValue } = piniaToastMessage();
    const { stomp } = piniaStompSocket();
    const { connectStompClient } = useStompSocket();
    
    
    /**
     * @return 텍스트 길이가 허용 범위 이내이면 true, 초과하면 false를 반환.
     */
    const checkMaxTextLangth = (text: string, maxTextLength: number, textUpdate: (t: string) => void): boolean => {
        if (text.length > maxTextLength) {
            textUpdate(text.slice(0, maxTextLength));
            messageWebview(`snackbar_custom?title=${encodeURIComponent(`${maxTextLength}자 까지만 입력 가능합니다.`)}&seconds=3`)
            // setToastValue({
            //     description: `${maxTextLength}자 까지만 입력 가능합니다.`
            // })

            return false;
        };
        return true;
    }


    /**
     * 소켓의 연결 상태를 판단
     * @returns 연결시 true, 비연결시 false 반환
     */
    const checkSocketConnected = () => {
        if (!stomp.client) return false;

        if (stomp.client.state !== 0) { // state === 0 (정상연결)
            alert('웹소켓에 연결중입니다 기다려주세요');
            connectStompClient();
            return false;
            // useStompSocketReconnect().reconnect(); return false;
        }
        
        return true;
    }


    /**
     * 입력된 텍스트가 공백인지 판단
     * @returns 공백이 아닐시 true, 공백일시 false 반환
     */
    const checkNoneBlankText = (text: string) => {
        const noneBlankText = text.replace(/\s+/g, '');

        if (noneBlankText.length > 0) return true;
        return false;
    }

    /**
     * 메세지를 연속으로 보내지 못하도록 지정한 시간이 지났는지 판단
     * @returns 지정한 시간이 지나서 메세지를 보낼 수 있는 경우 true, 지정한 시간이 지나지 않은 경우 false 반환
     */
    const checkSubmitIntervalTime = (flag: boolean) => {
        if (flag) {
            messageWebview(`snackbar_custom?title=${encodeURIComponent(`3초 뒤에 메세지 전송이 가능합니다.`)}&seconds=3`);
            // setToastValue({
            //     description: '3초 뒤에 메세지 전송이 가능합니다.'
            // })
            // fakeTextareaRef.value?.focus();
            // textareaRef.value?.focus();
            return false;
        };

        return true;
    }


    return {
        checkMaxTextLangth,
        checkSocketConnected,
        checkNoneBlankText,
        checkSubmitIntervalTime,
    }
}