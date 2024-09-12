<template>
    <div v-if="recentContents && recentContents.length" class="aimodel-fluid-content px-primary pt-space-top-lg pb-space-bottom-lg">
        <div class="title flex items-center justify-between">
            <h1 class="text-h3">{{ title }}</h1>
            <p class="text-cap-2m text-font-dark-03">최근 10일 기준</p>
        </div>
        <div
            class="content pt-primary grid grid-cols-2"
            :class="recentContents.length > 2 ? 'grid-rows-2' : 'grid-rows-1'"
        >
            <div
                v-for="(item,idx) in recentContents" :key="idx"
                class="relative odd:pr-primary even:pl-primary"
            >
                <div v-if="typeof item === 'string'" class="flex items-center justify-center h-full">
                    <span class="vertical-line absolute border-r-[1px] h-[calc(100%-24px)] y-center left-0 border-dashed border-border-gray-05"></span>
                    <span v-if="idx >= 2" class="horizontal-line absolute border-b-[1px] w-full left-0 top-0 border-dashed border-border-gray-05"></span>
                    <IconBrandSignBlank />
                </div>
                <div
                    v-else
                    @click="messageWebview(`https://cosign/sign_detail?modelId=${modelid}&subSeqId=${item.subSeqId}&isFree=${isFreeSign(item.ticket, item.pay, item.signStatusType)}`)"
                    :class="{'pb-3': idx < 2, 'pt-3': idx >= 2}"
                    class="block"
                >
                    <span v-if="idx % 2 === 1" class="vertical-line absolute border-r-[1px] h-[calc(100%-24px)] y-center left-0 border-dashed border-border-gray-05"></span>
                    <span v-if="idx >= 2" class="horizontal-line absolute border-b-[1px] w-full left-0 top-0 border-dashed border-border-gray-05"></span>
                    <div class="above flex items-center justify-between">
                        <CommonPartsEarningRate
                            :earning="item.earningRate.truncateDecimal(100)"
                            :size="17"
                            class="text-price-profit"
                        />
                        <span class="text-cap-2m text-font-dark-03">{{ updatedAtText(item.updatedAt) }}</span>
                    </div>
                    <div class="below flex items-center mt-2">
                        <div class="crypto-image w-crypto-sm mr-1">
                            <NuxtImg
                                :src="`${$config.public.IMAGE_URL}coin-image/v1/${item.digitalAssetsId}.png`"
                                :alt="item.digitalAssetsCode"
                                format="webp"
                                width="16"
                                height="16"
                                loading="lazy"
                            />
                        </div>
                        <span v-if="modelType === 'SPOT'" class="text-cap-1r">{{ item.digitalAssetsKoName }}</span>
                        <span v-if="modelType === 'FUTURES'" class="text-cap-1r">{{ item.cryptoFullCode }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { MODEL_DETAIL_RECENT_BEST } from '~/composables/_app/asyncDataFetchKeys';
import { useFetchAimodelDetail } from '~/composables/aimodel-detail/service/useFetchAimodelDetail';
import type { TradeType } from '~/composables/home/service/_types';
import { messageWebview } from '~/composables/_app/useFlutterWebview';
import { isFreeSign } from '~/composables/home/business/_methods';


const { modelid } = defineProps<{
    title: string;
    modelid: string;
    modelType?: TradeType;
}>();


const { getModelDetailRecentBest, recentContents, initRecentBest } = useFetchAimodelDetail();

const dynamicFetchKey = `${MODEL_DETAIL_RECENT_BEST}-${modelid}`;
const {
    data,
} = await useAsyncData(
    dynamicFetchKey,
    () => getModelDetailRecentBest(dynamicFetchKey, modelid as string)
)
initRecentBest(data.value);


const updatedAtText = (updatedAt: string) => Date.parseUtcToLocal(updatedAt).diffNow();

</script>