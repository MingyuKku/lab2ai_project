<template>
    <div
        @click="messageWebview(`https://cosign/sign_detail?modelId=${item.modelId}&subSeqId=${item.subSeqId}&isFree=${isFreeSign(item.ticket, item.pay, item.simpleStatusType)}`)"
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
    </div>
</template>

<script lang="ts" setup>
import type { ClassAnotherModelSignItem } from '~/composables/sign-detail/service/_types';
import { isFreeSign } from '~/composables/home/business/_methods';
import { messageWebview } from '~/composables/_app/useFlutterWebview';
import { useFuctions } from '~/composables/home/business/useFuctions';


const { item } = defineProps<{
    item: ClassAnotherModelSignItem;
    imageBase: string;
}>();

const { isBeforeTarget, isWaitTarget2, isWaitTarget3, isEarningSell } = useFuctions(item.evaluateState);


</script>