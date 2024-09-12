<template>
    <div
        class="complainted-icon absolute right-0 bottom-full -translate-y-2.5 cursor-pointer"
        @click="onClickComplaint"
    >
        <IconObjectComplaint />
    </div>
</template>

<script lang="ts" setup>
import { useFetchChatHandle } from '~/composables/cosign-chat/service/useFetchChatHandle';
import { piniaStompSocket } from '~/pinia/cosign-chat/piniaStompSocket';
import { piniaAlert } from '~/pinia/popup/piniaAlert';
import { piniaPopup } from '~/pinia/popup/piniaPopup';
import { piniaToastMessage } from '~/pinia/toast/piniaToastMessage';
import { piniaAuthInfoValues } from '~/pinia/user/piniaAuthInfoValues';
import { useChatAlert } from '~/composables/cosign-chat/business/useChatAlert';

const props = defineProps<{
    messageId: number;
}>();


const { isUserSignedIn } = piniaAuthInfoValues();
const { socketRoom } = piniaStompSocket();
const { openSigninAlert } = useChatAlert();
const { setToastValue } = piniaToastMessage();
const { togglePopupFlag } = piniaPopup();
const { setAlertValue, hiddenAlert } = piniaAlert();
const { complaintMessage } = useFetchChatHandle();


const onClickComplaint = () => {
    if (!isUserSignedIn) return openSigninAlert(`로그인 하신 후 이용하실 수 있습니다.`);
    togglePopupFlag(true);
    setAlertValue({
        description: '신고하시겠습니까?',
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
                label: '신고하기',
                onClick: async () => {
                    complaintMessage(socketRoom.room_uuid, props.messageId)
                    .then(res => {
                        if (res) {
                            const complaintMessageId = res.report;
                            // myComplaintMessage(complaintMessageId);
                            setToastValue({
                                description: '신고되었습니다.'
                            });
                        }
                    })
                    .finally(() => {
                        togglePopupFlag(false);
                        hiddenAlert();
                    })
                }
            }
        }
    })
}

</script>