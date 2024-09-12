import type { BasicRes, ErrorCode, intercepterContext } from "~/composables/_api/_types";
import type { ReturnMessageComplaint, ReturnMessageDelete } from "./_types";
import { piniaStompSocket } from "~/pinia/cosign-chat/piniaStompSocket";
import { useFetchInterceptor } from "~/composables/_api/useFetchInterceptor";
import { piniaToastMessage } from "~/pinia/toast/piniaToastMessage";

export const useFetchChatHandle = () => {

    const { myComplaintMessage } = piniaStompSocket();
    const { setToastValue } = piniaToastMessage();
    const { checkTokenExpireAndRefreshOrSignout } = useFetchInterceptor();
    
    const onResponseChatError = async (context: intercepterContext, message_id: number): Promise<void> => {
        
        const { error }:{error: ErrorCode} = context.response._data;

        if (!error.errorCode) return;

        if (
            error.errorCode === "800" &&
            error.errorName === "MESSAGE_ALREADY_HIDE_REQUEST_EXCEPTION"
        ) {
            setToastValue({
                description: '이미 신고한 메세지 입니다.'
            })
            myComplaintMessage(message_id); return;
        }

        checkTokenExpireAndRefreshOrSignout(error);
    }

    const deleteMessage = async (room_uuid: string, message_id: number): Promise<ReturnMessageDelete | null> => {
        const { $serviceChatApiFetch } = useNuxtApp();
        
        try {

            const { data } = await $serviceChatApiFetch<BasicRes>('message/hide', {
                method: 'DELETE',
                credentials: 'include',
                params: {
                    room_uuid,
                    message_id,
                }
            })

            const returnData: ReturnMessageDelete = data;

            return returnData;

        } catch (err) {
            return null;
        }
    }


    const complaintMessage = async (room_uuid: string, message_id: number): Promise<ReturnMessageComplaint | null> => {
        const { $serviceChatApiFetch } = useNuxtApp();
        
        try {

            const { data } = await $serviceChatApiFetch<BasicRes>('message/report-issue', {
                method: 'POST',
                credentials: 'include',
                onResponseError: (context: intercepterContext) => onResponseChatError(context, message_id),
                params: {
                    room_uuid,
                    message_id,
                }
            })

            const returnData: ReturnMessageComplaint = data;

            return returnData;


        } catch (err) {
            return null;
        }
    }

    return {
        deleteMessage,
        complaintMessage,
    }
}