<template>
    <div class="admin-chat relative mt-primary p-3 rounded-lg border border-border-dark-03 bg-gradient-to-r from-[#F4FAFF] to-[#F1EFFD]">
        <CosignChatDeleteBox
            v-if="socketUser.permission === 'ADMIN'"
            :messageId="item.message_id"
            class="absolute right-3 top-3 cursor-pointer"
        />
        <div class="chat-info flex items-center">
            <div class="w-[18px] h-[18px] bg-black rounded flex items-center justify-center">
                <div class="w-2"><IconBrandCosign2 /></div>
            </div>
            <div class="user-name text-h6 ml-1.5 leading-none"><span>코싸인</span></div>
            <span class="ml-2 text-cap-2m text-font-dark-03 leading-none">{{ Date.parseUtcToLocal(item.input_date_time).format('HH:mm') }}</span>
        </div>
        <p v-html="String.normalizeWhitespace(item.message)" class="content relative text-body-3 mt-2 whitespace-pre-wrap break-word">
        </p>
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