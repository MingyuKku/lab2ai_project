<template>
    <div class="sign-in-page pt-app-header bg-bg-white h-viewScreen overflow-hidden">
        <CommonHeadersAppHeader>
            <template #left>
                <div class="flex items-center">
                    <CommonHeadersBackHeaderIcon />
                    <h1 class="text-h2 ml-1">로그인</h1>
                </div>
            </template>
        </CommonHeadersAppHeader>
        <transition name="slide-up-scale" mode="out-in">
            <div v-if="isMounted" class="user-login-page">
                <div class="title text-center text-body-3 pt-primary">
                    <h1>
                        {{ coinCount }}개 코인에서 하루
                        <span
                            class="inline-block px-2 pt-[3px] pb-1 bg-profit-green-gra text-font-white leading-none rounded-full">{{
                            infoCount }}개 이상</span>
                        정보를
                    </h1>
                    <h1>AI가 쏟아낼텐데 어떻게 다 보죠?</h1>
                </div>
                <div class="video-wrap">
                    <video loop muted autoPlay playsInline
                        :poster="`${$config.public.IMAGE_URL}version1/user/login_vedio/thumbnail.png`"
                        class="w-full h-full object-cover object-center">
                        <source :src="`${$config.public.IMAGE_URL}version1/user/login_vedio/login-video.webm`"
                            type="video/webm" />
                        <source :src="`${$config.public.IMAGE_URL}version1/user/login_vedio/login-video.mp4`"
                            type="video/mp4" />
                    </video>
                </div>
                <div class="login-process-wrap pt-primary pb-8 px-8">
                    <div class="title text-center mb-4">
                        <h1 class="text-body-1 mb-1">로그인 후 원하는 정보만</h1>
                        <h1 class="text-body-1">실시간으로 알림 받아보세요!</h1>
                    </div>
                    <div class="signin-buttons">
                        <UserSignInButtonsGoogle />
                        <UserSignInButtonsApple class="mt-2" />
                        <NuxtLink
                            to="/user/sign-in/cosign"
                            :replace="true"
                            class="block mt-2"
                        >
                            <UserSignInButtonsCosign />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>

definePageMeta({
    middleware: 'sign-in'
})




const coinCount = 116;
const infoCount = 200;
const isMounted = ref<boolean>(false);

onMounted(() => {
    isMounted.value = true;
})

</script>