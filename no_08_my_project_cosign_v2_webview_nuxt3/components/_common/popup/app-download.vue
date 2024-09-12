<template>
    <div
        v-if="piniaPopup().appDownload.flag"
        class="app-download-popup fixed xy-center z-40 w-[300px] bg-bg-white rounded pt-8 pb-space-bottom-lg px-3"
    >
        <IconObjectClose @click="toggleAppDownloadPopupFlag(false)" class="absolute right-3 top-3 cursor-pointer" />
        <div class="flex flex-col justify-center items-center">
            <div class="image w-[52px] h-[52px]">
                <NuxtImg
                    src="https://kr.object.ncloudstorage.com/cosign/lab2ai/app-logo.png"
                    alt="bi"
                    width="52" height="52"
                    loading="lazy"
                    format="webp"
                />
            </div>
            <div class="text text-center mt-space-between-y-md">
                <h1 class="text-h4 text-position-short mb-3">{{ piniaPopup().appDownload.title ?? '이용권 구매는 앱에서 가능합니다.' }}</h1>
                <p class="text-body-3r">앱을 설치해 모든 SIGN과</p>
                <p class="text-body-3r">투자 정보를 알림으로 받아보세요.</p>
            </div>

            <div class="download-links flex items-center justify-around mt-space-top-lg">
                <a
                    href="https://apps.apple.com/kr/app/%EC%BD%94%EC%8B%B8%EC%9D%B8-cosign-ai-24%EC%8B%9C%EA%B0%84-%EC%BD%94%EC%9D%B8-%EC%8B%9C%EC%9E%A5%EA%B0%90%EC%A7%80/id6444056551"
                    target="_blank"
                    class="image-wrap block w-[42%] min-h-9"
                >
                    <NuxtImg 
                        src="https://kr.object.ncloudstorage.com/cosign/version1/common/app-store-down.svg" 
                        alt="download-image" 
                        format="webp"
                        loading="lazy"
                        width="126"
                        height="40"
                    />
                </a>
                <a
                    href="https://play.google.com/store/apps/details?id=com.lab2ai.cosign"
                    target="_blank"
                    class="image-wrap block w-[45%] min-h-[50px]"
                >
                    <NuxtImg 
                        src="https://kr.object.ncloudstorage.com/cosign/version1/common/google-play-down.png" 
                        alt="download-image" 
                        format="webp"
                        loading="lazy"
                        width="126"
                        height="50"
                    />
                </a>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts" setup>
import { piniaPopup } from '~/pinia/popup/piniaPopup';

const { toggleAppDownloadPopupFlag } = piniaPopup();

const { afterEach } = useRouter();

afterEach((to, from) => {
    if (!piniaPopup().appDownload.flag) return;

    toggleAppDownloadPopupFlag(false);
})
</script>