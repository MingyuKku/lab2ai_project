<template>
    <transition name="opacity" mode="out-in">
        <div
            v-if="piniaPopup().popupFlag"
            class="common-popup fixed top-0 left-0 z-40 w-full min-h-viewScreen bg-bg-black/80"
        ></div>
    </transition>
</template>

<script lang="ts" setup>
import { piniaPopup } from '~/pinia/popup/piniaPopup';

const { togglePopupFlag } = piniaPopup();
const { afterEach } = useRouter();

afterEach((to, from) => {
    if (!piniaPopup().popupFlag) return;
    togglePopupFlag(false);
})


</script>