<template>
    <div
        class="signin-google-button flex items-center justify-center h-[46px] bg-bg-white rounded-md !border border-bg-black cursor-pointer"
        @click="onClickGoogleSigninBtn"
    >
        <div class="w-5 mr-0.5"><IconBrandGoogle /></div>
        <span class="text-body-3 ml-1 text-font-dark-01">Google 계정으로 로그인</span>
    </div>
</template>

<script lang="ts" setup>
import { useGoogleSignIn } from '~/composables/user/sign-in/business/useGoogleSignIn';

const { initGoogleLoginFunc } = useGoogleSignIn();

const onClickGoogleSigninBtn = () => {
    initGoogleLoginFunc();
    window.open("/cert/popup/google", "_blank", "width=500, height=500");
}


</script>