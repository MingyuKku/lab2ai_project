<template>
    <NuxtLink
        :to="`/${item.modelId}/${item.subSeqId}`"
        class="fluid-content-2-card block p-3 border border-border-gray-05 rounded-lg shadow-01"
    >
        <SignDetailFluidContent2CardTitle
            :item="item"
        />
        <HomeCardItemStart
            v-if="isBeforeTarget()"
            :item="item"
            :imageBase="imageBase"
        />
        <HomeCardItemTarget
            v-if="isWaitTarget2() || isWaitTarget3()"
            :item="item"
            :imageBase="imageBase"
        />
        <HomeCardItemSell
            v-if="isEarningSell()"
            :item="item"
            :imageBase="imageBase"
        />
    </NuxtLink>
</template>

<script lang="ts" setup>
import { useFuctions } from '~/composables/home/business/useFuctions';
import type { ClassAnotherModelSignItem } from '~/composables/sign-detail/service/_types';


const { item, imageBase } = defineProps<{
    item: ClassAnotherModelSignItem;
    imageBase: string;
}>();

const { isBeforeTarget, isWaitTarget2, isWaitTarget3, isEarningSell } = useFuctions(item.evaluateState);


</script>