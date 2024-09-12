<template>
    
    <!-- @click="messageWebview(`https://cosign/model_detail?modelId=${item.modelId}&modelTitle=${item.modelKoName}`)" -->
    <div
        @click.stop="onClickModelItem"
        class="model-item block px-primary pt-space-top-lg pb-space-bottom-lg"
    >
        <AimodelListItemStats :item="item" :lazyLoad="lazyLoad" :class="{'pb-space-between-y-ssm': item.recentBestSignItems.length}" />
        <AimodelListItemFluidContent
            v-if="item.recentBestSignItems.length"
            content-title="최근 높은 수익 SIGN"
            :modelId="item.modelId"
            :items="item.recentBestSignItems"
        />
        <div
            v-if="item.signOnCount > 0"
            class="sign-active-button flex items-center justify-center border-[1.5px] border-border-dark-02 rounded-[8px] h-12 mt-3"
        >
            <CommonLoadingSpinnerLdsEllipsis class="mr-2" />
            <h1 class="text-h5">AI 예측 <span class="text-system-mint">{{ item.signOnCount }}건</span> 진행 중</h1>
            <IconDirectionMd fill="#000" class="ml-2" />
        </div>
        <div v-else class="flex items-center justify-center border-[1.5px] border-border-gray-02 rounded-[8px] h-12 mt-3">
            <CommonLoadingSpinnerDonut class="mr-2" />
            <h1 class="text-h5 text-font-dark-02">최적의 진입가 예측을 위해 AI 분석 중</h1>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PredictionModelItem } from '~/composables/aimodel/service/_types';
import { messageWebview } from '~/composables/_app/useFlutterWebview';


const { item } = defineProps<{
    item: PredictionModelItem;
    lazyLoad: boolean;
}>();

const onClickModelItem = () => {
    // messageWebview(`2.0.0: {"major": "route", "category": "modelDetail", "title": "${item.modelKoName}", "params": {"modelId": "${item.modelId}", "tradeType": "${item.modelType}"}}`)
    messageWebview(`https://cosign/model_detail?modelId=${item.modelId}&modelName=${item.modelKoName}&tradeType=${item.modelType}`);
}


</script>