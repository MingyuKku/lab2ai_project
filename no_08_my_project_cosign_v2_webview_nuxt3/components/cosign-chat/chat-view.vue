<template>
    <div class="cosign-chat-view px-primary py-3">
        <div v-for="message,idx in piniaStompSocket().messages" :key="idx" class="pb-3">
            <div v-if="isDifferentDate(idx-1, idx)" class="date flex justify-center mt-space-top-lg">
                <span class="text-cap-2m text-font-dark-01 py-1.5 px-3 bg-bg-gray-05 rounded-full">{{ message.date_format }}</span>
            </div>
            <CosignChatViewItem
                :message="message"
                :isIntersectItem="idx === 5"
                :refresh="moreListFetch"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { piniaStompSocket } from '~/pinia/cosign-chat/piniaStompSocket';
import { useVisualViewport } from '~/composables/cosign-chat/business/useVisualViewport';
import { useRefreshFetch } from '~/composables/cosign-chat/business/useRefreshFetch';
import { CHAT_GET_HISTORY } from '~/composables/_app/asyncDataFetchKeys';
import { useFetchChatHistory } from '~/composables/cosign-chat/service/useFetchChatHistory';
import { useVisibilitychange } from '~/composables/cosign-chat/business/useVisibilitychange';


const { getHistory } = useFetchChatHistory();

const {
    data: history,
    refresh
} = await useAsyncData(CHAT_GET_HISTORY, () => getHistory(CHAT_GET_HISTORY))
// updateMessage(history.value?.message_history);
console.log('히스토리', history.value)
const { moreListFetch } = useRefreshFetch(refresh);


const isDifferentDate = (prevIdx: number, curIdx: number) => {
    const { messages } = piniaStompSocket();

    // 시분초를 제거한 값을 비교(년,월,일 만 비교)
    const prevDateWithoutTime = Date.parseUtcToLocal(messages[prevIdx]?.input_date_time).setHours(0,0,0,0);
    const curateWithoutTime = Date.parseUtcToLocal(messages[curIdx]?.input_date_time).setHours(0,0,0,0);

    return prevDateWithoutTime !== curateWithoutTime;
}

useVisualViewport();
useVisibilitychange(moreListFetch);


</script>