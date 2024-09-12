<template>
    <div
        ref="itemRef"
        class="card-item"
        v-bind="{
            [domAttributeFilterName.tradeType]: item.tradeType,
            // [domAttributeFilterName.show]: itemData.showFlag ? 'view' : 'hide',
        }"
    >
        <div v-if="isFreeSign(item.ticket, item.pay, item.simpleStatusType)" class="flex w-[119px] h-[26px] rounded-ee-2xl overflow-hidden">
            <HomePartsFreeSign />
        </div>
        <NuxtLink
            :to="`/${item.modelId}/${item.subSeqId}`"
            class="block p-primary"
        >
        <!-- :tradePrice="itemData.tradePrice"
                :change="itemData.change" -->
            <HomeCardItemTitle
                :item="item"
                :tradePrice="item.tradeExchangeType === 'UPBIT' ? getEqualMessageItem()?.tradePrice ?? null : binanceUiData.tradePrice"
                :change="item.tradeExchangeType === 'UPBIT' ? getEqualMessageItem()?.change ?? null : binanceUiData.change"
                :imageBase="imageBase"
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
        <!-- <div v-else class="virtual" :style="{ height: `${itemData.virtualHeight}px` }"></div> -->
    </div>
</template>

<script lang="ts" setup>
import { useIntersectionObserver } from '~/composables/home/business/intersectionObserver';
import { useFuctions } from '~/composables/home/business/useFuctions';
import type { ClassHomeSignItem } from '~/composables/home/service/_types';
import { domAttributeFilterName } from "~/composables/home/business/variables";
import { isFreeSign } from "~/composables/home/business/_methods";
import type { UpbitSocketMessageItem, UpbitTickerChangeType } from '~/composables/home/business/_types';


const props = defineProps<{
    itemIndex: number;
    item: ClassHomeSignItem;
    isLast: boolean;
    signItemListRefresh?: () => Promise<void>;
    imageBase: string;
    socketMessages: UpbitSocketMessageItem[];
    // isMobile: boolean;
}>();


const { isBeforeTarget, isWaitTarget2, isWaitTarget3, isEarningSell } = useFuctions(props.item.evaluateState);

const {
    initIntersectObserver,
    binanceUiData,
} = useIntersectionObserver({
    digitalAssetsCode: props.item.cryptoCurrencyItem.digitalAssetsCode,
    type: props.item.tradeExchangeType,
    isLastEl: props.isLast,
    signItemListRefresh: props.signItemListRefresh
});


const itemRef = ref<HTMLElement | null>(null);


const getEqualMessageItem = () => {
    const { socketMessages, item } = props;
    return socketMessages.find(msg => msg.code === 'KRW-' + item.cryptoCurrencyItem.digitalAssetsCode) ?? null
}

onMounted(() => {
    // if (props.item.simpleStatusType !== 'end') initIntersectObserver(itemRef.value);
    initIntersectObserver(itemRef.value);
})

</script>