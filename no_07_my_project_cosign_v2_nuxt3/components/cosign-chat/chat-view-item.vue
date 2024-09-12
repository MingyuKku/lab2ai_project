<template>
    <div ref="itemRef" class="chat-view-item">
        <!-- {{ message.permission }} -->
        <CosignChatAdminChat
            v-if="message.permission === 'ADMIN'"
            :item="message"
        />
        <CosignChatMyChat
            v-else-if="message.uiType === 'my'"
            :item="message"
        />
        <CosignChatOthersChat
            v-else-if="message.uiType === 'others'"
            :item="message"
        />
    </div>
</template>

<script lang="ts" setup>
import { useIntersectionObserver } from '~/composables/cosign-chat/business/useIntersectionObserver';
import type { ClassMessageHistory } from '~/composables/cosign-chat/service/_types';


const props = defineProps<{
    message: ClassMessageHistory;
    isIntersectItem: boolean;
    refresh: () => Promise<void>;
}>();

const itemRef = ref<HTMLDivElement>();



onMounted(() => {
    const { isIntersectItem, refresh } = props;

    if (isIntersectItem) {
        useIntersectionObserver({
            element: itemRef.value,
            refresh: refresh
        });
    }
})



</script>