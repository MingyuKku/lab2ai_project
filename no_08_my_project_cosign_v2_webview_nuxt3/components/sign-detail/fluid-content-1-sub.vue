<template>
    <div class="fluid-content-1-sub relative w-full bg-system-mint rounded-lg px-3 pt-3 pb-[15px] shadow-01">
        <div class="bg-image absolute w-3/5 h-full top-0 right-0 overflow-hidden">
            <NuxtImg
                :src="`${$config.public.IMAGE_URL}version2/background/bg-geometry-hexagon.png`"
                alt="bg"
                width="360"
                height="110"
                loading="lazy"
                format="webp"
                :style="{
                    'object-position': '0px -100px'
                }"
            />
        </div>
        <IconObjectTriangle width="14" fill="#37CCA4" class="absolute bottom-[calc(100%-1px)] left-9" />
        <div class="text-font-white">
            <h1 class="text-body-1 drop-shadow-default">{{ modelName }}의 {{ cryptoCode }} 최고 수익</h1>
            <!-- <h1 class="text-h3 drop-shadow-default">{{ cryptoCode }} 최고 수익</h1> -->
        </div>
        <div class="flex items-center mt-3 relative">
            <div
                v-for="item,idx in items"
                :key="idx"
                @click="messageWebview(`https://cosign/sign_detail?modelId=${modelId}&subSeqId=${item.subSeqId}&isFree=${isFreeSign(item.ticket, item.pay, item.signStatusType)}`)" 
                class="flex items-center px-1.5 py-[7px] bg-bg-white rounded shadow-02 mr-2 last:mr-0"
            >
                <span class="text-cap-2m pl-0.5">{{ item.validateMin.validateMinText() }}</span>
                <CommonPartsEarningRate
                    :earning="item.earningRate >= 10 ? item.earningRate.truncateDecimal(10) : item.earningRate.truncateDecimal(100)"
                    :size="14"
                    class="leading-[0] ml-1.5 text-price-profit"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ModelEarningRateItems } from '~/composables/sign-detail/service/_types';
import { isFreeSign } from '~/composables/home/business/_methods';
import { messageWebview } from '~/composables/_app/useFlutterWebview';

defineProps<{
    modelName: string;
    modelId: string;
    cryptoCode: string;
    items: ModelEarningRateItems[];
}>();


</script>