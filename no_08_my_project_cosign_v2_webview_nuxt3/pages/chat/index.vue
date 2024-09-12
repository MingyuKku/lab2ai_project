<template>
    <div
        ref="chatWrapRef"
        class="cosign-socket-chat-page will-change-height"
        :class="{'h-viewScreen overflow-y-auto overscroll-none scrolling-touch': isIos}"
    >
        <!-- ios환경에서는 스크롤바를 이 요소에 생기게 한다(버그 문제) -->
        <div
            class="cosign-socket-chat-page-inner bg-[#F3F3F3]"
            :class="isIos ? 'min-h-viewScreen+1' : 'min-h-viewScreen'"
            :style="computedInputAreaHeight"
        >
            <div class="">
                <CosignChatView />
                <CosignChatInput
                    :updateInputAreaHeight="updateInputAreaHeight"
                />
            </div>
            <!-- <button @click="testClick">에헤이</button> -->
        </div>
    </div>
</template>


<script lang="ts" setup>
import { piniaStompSocket } from '~/pinia/cosign-chat/piniaStompSocket';
import { useFetchChatInfo } from '~/composables/cosign-chat/service/useFetchChatInfo';
import { useRefetchChatUser } from '~/composables/cosign-chat/service/useRefetchChatUser';
import { useInputAreaHeightUpdate } from '~/composables/cosign-chat/business/useInputAreaHeightUpdate';
import { useStompSocket } from '~/composables/cosign-chat/business/useStompSocket';



const { isMobile, isIos } = useDevice();
const chatWrapRef = ref<HTMLDivElement>();

const { updateSocketRoom, updateSocketUser, setRefElement } = piniaStompSocket();
const { connectStompClient, clearStompClient, scrollToBottom } = useStompSocket();

const { room, user } = await useFetchChatInfo();
updateSocketRoom(room.value);
updateSocketUser(user.value);
// console.log('응답', room.value, user.value)

const INPUT_AREA_INIT_HEIGHT = 72;
const { updateInputAreaHeight, computedInputAreaHeight } = useInputAreaHeightUpdate(INPUT_AREA_INIT_HEIGHT);




const setWebviewChatMethode = () => {
    if (!window) return;

    window.refetchChatUser = async () => {
        const res = await useRefetchChatUser();
        if (res) {
            updateSocketUser(res);
        }
    }
}

onMounted(() => {
    connectStompClient();
    setRefElement(chatWrapRef.value);
    scrollToBottom();
    setWebviewChatMethode();
});


onUnmounted(() => {
    clearStompClient();
})

</script>