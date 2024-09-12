<template>
    <transition name="opacity-up" mode="out-in">
        <div
            v-if="piniaToastMessage().toastValues.flag"
            class="toast-message px-primary"
            :class="isInsert ? 'absolute w-full left-0 bottom-[calc(100%+15px)]' : 'fixed bottom-0 w-full max-w-desktop'"
        >
            <div class="message-box shadow-toast bg-white h-11 flex items-center px-[18px] rounded-[3px]">
                <p class="text-body-5">{{ piniaToastMessage().toastValues.description }}</p>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { piniaToastMessage } from '~/pinia/toast/piniaToastMessage';


defineProps<{
    isInsert?: boolean;
}>()



</script>