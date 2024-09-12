<template>
    <div></div>
</template>

<script lang="ts" setup>
import { useGoogleSignIn } from '~/composables/user/sign-in/business/useGoogleSignIn';


onMounted(() => {
    const { showGoogleLoginPage } = useGoogleSignIn();
    showGoogleLoginPage();
});


</script>