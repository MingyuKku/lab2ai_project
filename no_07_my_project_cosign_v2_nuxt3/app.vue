<template>
    <div class="cosign-app text-font-black bg-bg-gray-04">
        <NuxtLoadingIndicator
            :throttle="throttleTimout"
            :height="2"
            :style="{
                'background-image': 'linear-gradient(to right, #00B287 0%, #1ED470 50%, #37CCA4 100%)'
            }"
        />
        <NuxtLayout class="layouts">
            <LazyCommonPageLoadingView v-if="pageLoading" />
            <LazyCommonPopup />
            <LazyCommonPopupAlert />
            <LazyCommonPopupSocialSignupCheck />
            <LazyCommonPopupAppDownload />
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script lang="ts" setup>
import { throttleTimout, usePageHook } from '~~/composables/_app/usePageHook';
import { useVisibilitychangeRefresh } from '~/composables/_app/useVisibilitychangeRefresh';
import { piniaAuthInfoValues } from './pinia/user/piniaAuthInfoValues';

const { pageLoading } = usePageHook();

useVisibilitychangeRefresh();

const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
}


// const { isUserSignedIn } = piniaAuthInfoValues();
// if (!isUserSignedIn) {
//     throw new Error('no user token')
// }

onMounted(() => {
    setScreenSize();
    window.addEventListener('resize', setScreenSize);
})



onUnmounted(() => {
    window.removeEventListener('resize', setScreenSize);
})
</script>