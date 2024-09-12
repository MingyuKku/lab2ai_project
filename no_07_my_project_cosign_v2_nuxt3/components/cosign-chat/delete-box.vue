<template>
    <div
        @click="onClickDelete"
        class="close-box w-5 h-5 border border-border-gray-01 rounded flex items-center justify-center"
    ><IconObjectClose /></div>
</template>

<script lang="ts" setup>
import { useFetchChatHandle } from '~/composables/cosign-chat/service/useFetchChatHandle';
import { piniaStompSocket } from '~/pinia/cosign-chat/piniaStompSocket';
import { piniaPopup } from '~/pinia/popup/piniaPopup';
import { piniaAlert } from '~/pinia/popup/piniaAlert';


const props = defineProps<{
    messageId: number;
}>();

const { socketRoom, deleteMessage: deletePiniaMessage } = piniaStompSocket();
const { togglePopupFlag } = piniaPopup();
const { setAlertValue, hiddenAlert } = piniaAlert();
const { deleteMessage } = useFetchChatHandle();


const onClickDelete = () => {
    togglePopupFlag(true);
    setAlertValue({
        description: '삭제하시겠습니까?',
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
                label: '삭제하기',
                onClick: async () => {
                    deleteMessage(socketRoom.room_uuid, props.messageId)
                    .then(res => {
                        if (res) {
                            const deleteMessageId = res.hide;
                            deletePiniaMessage(deleteMessageId);
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