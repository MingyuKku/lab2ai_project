<template>
    <div
        class="w-[500px] break-words"
        v-for="acc in accessTokenRef" :key="acc"
    >
        {{ acc }}
    </div>
</template>

<script lang="ts" setup>
import { useGoogleSignIn } from '~/composables/user/sign-in/business/useGoogleSignIn';
// import { loginOrShowPopupToParentByGoogle } from "~~/composables/user/social/google";

const accessTokenRef = ref<string[]>();

onMounted(async () => {
    
    const { loginOrShowPopupToParentByGoogle } = useGoogleSignIn();

    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = parsedHash.get("access_token");

    if (accessToken) {
        loginOrShowPopupToParentByGoogle(accessToken);
    }
    // const loginResult = await buildLoginResponseByGoogleAccessToken(accessToken);

    // if(loginResult.loginType === 'USER') {
    //     window.opener.login.google(loginResult.response);
        
    //     // window.close();
    // } else if(loginResult.loginType === 'NON_USER') {
    //     window.opener.signup.google(JSON.stringify(loginResult.response));
    //     // window.close();
    // }
})

</script>
