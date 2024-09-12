<template>
    <div
        class="signin-apple-button relative flex items-center justify-center h-[46px] bg-bg-black rounded-md cursor-pointer"
        @click="onClickAppleSigninBtn"
    >
        <div class="w-5 mr-0.5"><IconBrandApple /></div>
        <span class="text-body-3 ml-1 text-font-white">Apple 계정으로 로그인</span>
        <div id="appleid-signin" data-type="sign in" ref="btnAppleSignIn" class="absolute invisible"></div>
    </div>
</template>

<script lang="ts" setup>
import { useAppleSignIn } from '~/composables/user/sign-in/business/useAppleSignIn';

const { showApplePopup } = useAppleSignIn();
const btnAppleSignIn = ref<HTMLElement | null>(null);

const onClickAppleSigninBtn = () => {
    showApplePopup();

    btnAppleSignIn.value?.click();
}


</script>