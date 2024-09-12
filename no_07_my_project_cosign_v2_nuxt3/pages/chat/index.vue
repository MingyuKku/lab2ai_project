<template>
    <div
        ref="chatWrapRef"
        class="cosign-socket-chat-page"
        :class="{'h-viewScreen overflow-y-auto overscroll-none scrolling-touch': isIos}"
    >
        <LazyCosignChatPolicy :flag="chatPolicyFlag" :updateFlag="updateChatPolicyFlag" />
        <!-- ios환경에서는 스크롤바를 이 요소에 생기게 한다(버그 문제) -->
        <div
            class="cosign-socket-chat-page-inner bg-[#F3F3F3] pt-app-header"
            :class="isIos ? 'min-h-viewScreen+1' : 'min-h-viewScreen'"
            :style="computedInputAreaHeight"
        >
            <CommonHeadersAppHeader>
                <template #left>
                    <div class="flex items-center">
                        <CommonHeadersBackHeaderIcon />
                        <h1 class="text-h3 ml-1">코싸인 챗</h1>
                    </div>
                </template>
                <template #right>
                    <CosignChatHeaderIcon :updateFlag="updateChatPolicyFlag" />
                </template>
            </CommonHeadersAppHeader>
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
import { useChatPolicyFlag } from '~/composables/cosign-chat/business/useChatPolicyFlag';
import { useInputAreaHeightUpdate } from '~/composables/cosign-chat/business/useInputAreaHeightUpdate';
// import { CHAT_GET_ROOM, CHAT_GET_USER } from '~/composables/_app/asyncDataFetchKeys';
import { useStompSocket } from '~/composables/cosign-chat/business/useStompSocket';



const { isMobile, isIos } = useDevice();
const chatWrapRef = ref<HTMLDivElement>();

const { chatPolicyFlag, updateChatPolicyFlag } = useChatPolicyFlag();
const { updateSocketRoom, updateSocketUser, setRefElement } = piniaStompSocket();
const { connectStompClient, clearStompClient, scrollToBottom } = useStompSocket();

// const { room, user } = await useFetchChatInfo({
//     chatRoomKey: CHAT_GET_ROOM,
//     chatUserKey: CHAT_GET_USER
// });
const { room, user } = await useFetchChatInfo();
updateSocketRoom(room.value);
updateSocketUser(user.value);
// console.log('응답', room.value, user.value)

const INPUT_AREA_INIT_HEIGHT = 72;
const { updateInputAreaHeight, computedInputAreaHeight } = useInputAreaHeightUpdate(INPUT_AREA_INIT_HEIGHT);


onMounted(() => {
    connectStompClient();
    setRefElement(chatWrapRef.value);
    scrollToBottom();
});


onUnmounted(() => {
    clearStompClient();
})

</script>