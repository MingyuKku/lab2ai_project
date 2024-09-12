<template>
    <div @click="isUserSignedIn ? messageWebview(`https://cosign/purchase`) : messageWebview(`https://cosign/login`)" class="blur-view block relative">
        <div class="bg-image">
            <!-- <div class="blur-dark absolute top-0 left-0 w-full h-full"></div> -->
            <NuxtImg
                src="https://kr.object.ncloudstorage.com/cosign/version2/sign/blur-sign-detail-chart-bg.png"
                alt="blur-bg"
                width="320" height="270"
                format="webp"
                preload
                class="h-full object-cover"
            />
        </div>
        <div class="absolute xy-center bg-bg-white w-[306px] pt-3 pb-5 px-primary rounded-xl border border-border-gray-03 shadow-dubble-01">
            <div class="top flex">
                <IconObjectLock fill="#707a8a" :size="19" class="mr-0.5" />
                <span class="text-h6 text-font-dark-02">유료 SIGN</span>
            </div>
            <div class="text-description text-center mt-space-top-md">
                <p class="text-h4">진입·목표가 궁금하시죠? 😁</p>
                <p class="text-h4">모든 AI SIGN을 보고 싶으시다면?!</p>
            </div>
            <div class="buttons flex items-center justify-between mt-[18px]">
                <div class="flex items-center justify-center h-12 rounded-full flex-1 bg-bg-gray-03 text-body-2 mr-2">둘러보기</div>
                <div class="flex items-center justify-center h-12 rounded-full flex-1 bg-cosign-gra2 text-h4 text-font-white shadow-inner-01">바로가기</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { messageWebview } from '~/composables/_app/useFlutterWebview';
import { piniaAuthInfoValues } from '~/pinia/user/piniaAuthInfoValues';

const { isUserSignedIn } = piniaAuthInfoValues();

</script>