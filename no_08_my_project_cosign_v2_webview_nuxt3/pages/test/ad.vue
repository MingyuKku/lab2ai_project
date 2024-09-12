<template>
        SHOW INTERSTITIAL AD!

        <div @click="messageWebview('https://cosign/login')">GO TO LOGIN</div>
</template>
<script lang='ts' setup>
    import { messageWebview } from '~/composables/_app/useFlutterWebview';

    onMounted(() => {
        messageWebview("show_interstitial_ad")
    })
</script>
<style>
</style>