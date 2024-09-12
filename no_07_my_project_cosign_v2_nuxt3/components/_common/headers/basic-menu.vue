<template>
    <div class="flex items-center">
        <NuxtLink to="/search" class="mr-3"><IconObjectMagnifier /></NuxtLink>
        <NuxtLink to="/menu"><IconNavMenu fill="#000" /></NuxtLink>
        <!-- <NuxtLink :to="`/${$route.params.locale}/menu`"><IconObjectMenu /></NuxtLink> -->
    </div>
</template>

<script lang="ts" setup>
import { CHAT_GET_HISTORY } from '~/composables/_app/asyncDataFetchKeys';
import { useCommon } from '~/composables/_app/useCommon';


const onClickTestSocket = () => {
    clearNuxtData(CHAT_GET_HISTORY);
}


</script>