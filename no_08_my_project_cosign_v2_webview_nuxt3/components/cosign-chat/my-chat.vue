<template>
    <div class="my-chat mt-space-top-lg flex justify-end">
        <div class="chat-content flex items-end">
            <span class="mr-2 text-cap-2m text-font-dark-03">{{ Date.parseUtcToLocal(item.input_date_time).format('HH:mm') }}</span>
            <p
                class="chat-text whitespace-pre-wrap break-word text-body-3r py-2 px-3 text-white bg-bg-dark-04 rounded-lg rounded-ee-none"
                v-html="String.normalizeWhitespace(item.message)"
            >
            </p>
        </div>
    </div>
</template>


<script lang="ts" setup>
import type { IMessageBody } from '~/pinia/cosign-chat/_types';

defineProps<{
    item: IMessageBody;
}>();


// const computedText = computed(() => item.message.replace(/ /g, '&nbsp;'));

</script>