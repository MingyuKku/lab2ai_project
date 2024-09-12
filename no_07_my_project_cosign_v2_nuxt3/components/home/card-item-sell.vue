<template>
    <div class="sign-success mt-3">
        <div class="content flex justify-center py-5">
            <div class="model-sign-success flex items-center">
                <div
                    class="image model-image-lg mr-3 bg-no-repeat bg-cover bg-center"
                    :style="bgSrcUrl"
                >
                </div>
                <div>
                    <h1 class="text-h3">{{ item.modelName }} 예측 적중!</h1>
                    <div class="flex items-center text-price-profit mt-0.5">
                        <span class="text-h4 mr-1">수익률</span>
                        <CommonPartsEarningRate
                            v-if="item.earningRate"
                            :earning="item.earningRate.truncateDecimal(100)"
                            :size="17"
                        />
                        <!-- <span v-if="item.earningRate" class="text-price-17b">{{  item.earningRate.truncateDecimal(100) }}%</span> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="below clearFix mt-[5px]">
            <!-- <span v-if="$route.query.sortType === 'created'" class="text-cap-2m text-font-dark-03 float-right">{{ item.createdAtText }}</span>
            <span v-else class="text-cap-2m text-font-dark-03 float-right">{{ item.updatedAtText }}</span> -->
            <span class="text-cap-2m text-font-dark-03 float-right">{{ item.createdAtText }}</span>
        </div>
    </div>
</template>


<script lang="ts" setup>
import type { ClassHomeSignItem } from '~/composables/home/service/_types';


const { item, imageBase } = defineProps<{
    item: ClassHomeSignItem;
    imageBase: string;
}>();


let bgSrcUrl = computed(() => ({
    'background-image': `url(${imageBase}version2/model-image/large/${item.modelId}.png)`
}));



</script>