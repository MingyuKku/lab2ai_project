<template>
    <div class="scroll-top-button fixed bottom-0 z-30 h-main-nav flex items-center justify-center"
        :class="!isMobile ? 'w-desktop' : 'w-full left-0'"
    >
        <div
            @click="onClickButton"
            class="absolute flex items-center justify-center right-4 bottom-full -translate-y-[30px] w-10 h-10 bg-bg-black rounded-full shadow-light-01 cursor-pointer border border-border-gray-04"
        >
            <IconObjectAlarm fill="#FFF" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { piniaPopup } from '~/pinia/popup/piniaPopup';


const { isMobile } = useDevice();

const onClickButton = () => {
    const { toggleAppDownloadPopupFlag } = piniaPopup();
    toggleAppDownloadPopupFlag(true, `
        알림설정은 앱에서 가능합니다.
    `);
}


</script>