<template>
    <div class="home-filter bg-white px-primary border-b-[1px] border-border-gray-05 pt-space-top-lg pb-space-between-y-md">
        <HomeFilterSelectArea
            :refresh="refresh"
        />
        <HomeFilterCryptoList
            v-if="list"
            :list="list"
            :refresh="refresh"
            :updateCryptoViewList="updateCryptoViewList"
        />
    </div>
</template>

<script lang="ts" setup>
import type { CryptoFilterItem, CryptoListReactiveData } from '~/composables/home/service/_types';

defineProps<{
    list: CryptoListReactiveData;
    refresh: () => Promise<void>;
        updateCryptoViewList: (digitalAssetsId: number) => void;
}>();



</script>