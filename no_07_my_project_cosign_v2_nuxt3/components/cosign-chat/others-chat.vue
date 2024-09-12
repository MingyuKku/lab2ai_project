<template>
    <div class="others-chat mt-space-top-md">
        <div class="chat-info flex items-center">
            <div class="user-name text-h6 mr-2 leading-5"><span>{{ item.user_nickname }}</span></div>
            <div v-if="['PREMIUM', 'BASIC'].includes(item.permission)" class="user-type flex items-center">
                <IconObjectTicketP v-if="item.permission === 'PREMIUM'" />
                <IconObjectTicketB v-else />
                <span
                    class="bg-clip-text text-transparent text-cap-1b leading-5 ml-1"
                    :class="item.permission === 'PREMIUM' ? 'bg-position-short-goal-3' : 'bg-position-long'"
                    >
                    {{ item.permission === 'PREMIUM' ? '프리미엄' : '베이직' }}
                </span>
            </div>
        </div>
        <div class="chat-content mt-2 flex items-end">
            <div class="chat-text relative min-w-[251px] text-body-3r py-2 px-3 bg-white rounded-lg rounded-ss-none shadow-chat">
                <p v-html="String.normalizeWhitespace(item.message)" class="whitespace-pre-wrap break-word"></p>
                <CosignChatDeleteBox
                    v-if="socketUser.permission === 'ADMIN'"
                    :messageId="item.message_id"
                    class="absolute right-0 bottom-full -translate-y-2.5 cursor-pointer"
                />
                <CosignChatComplaintIcon v-else :messageId="item.message_id" />
            </div>
            <span class="ml-2 text-cap-2m text-font-dark-03">{{ Date.parseUtcToLocal(item.input_date_time).format('HH:mm') }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { piniaStompSocket } from '~/pinia/cosign-chat/piniaStompSocket';
import type { IMessageBody } from '~/pinia/cosign-chat/_types';


defineProps<{
    item: IMessageBody;
}>();

const { socketUser } = piniaStompSocket();

// const computedText = computed(() => item.message.replace(/ /g, '&nbsp;'));


</script>