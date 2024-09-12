<template>
    <div class="fluid-content-1 bg-bg-white px-primary pt-space-top-lg pb-space-bottom-lg">
        <div v-if="title" class="title mb-space-top-md">
            <div v-if="titleType === 'html'" v-html="title"></div>
            <h1 v-else>{{ title }}</h1>
        </div>
        <div v-if="item" class="flex justify-between pb-primary px-1">
            <div class="model flex flex-col items-center w-20">
                <div class="image-wrap relative">
                    <IconAnimationSignDetailModelFrame class="absolute xy-center z-[2]" />
                    <IconAnimationSignDetailModelSideFrame class="absolute xy-center z-0" />
                    <div class="image model-image-lg relative z-[1]">
                        <NuxtImg
                            :src="`${$config.public.IMAGE_URL}version2/model-image/large/${item.modelId}.png`"
                            alt="isa"
                            width="68"
                            height="56"
                            loading="lazy"
                            format="webp"
                        />
                    </div>
                </div>
                <div class="text-cap-2m mt-1 break-all h-7 flex items-center justify-center text-center">{{ item.modelTopsEarningRateResponse.modelName }}</div>
            </div>
            <div class="hit-rate flex-1 flex justify-center pt-3">
                <div class="flex-1">
                    <p class="text-cap-1m text-font-dark-03 text-center">적중률</p>
                    <div class="flex items-center mt-2 relative">
                        <div class="triangle absolute xy-center">
                            <IconObjectTriangle class="rotate-180 mb-1" width="4"/>
                            <IconObjectTriangle width="4" />
                        </div>
                        <div class="flex-1 flex justify-center">
                            <div class="relative">
                                <div class="highlight absolute bottom-0 left-0 w-full h-2.5 bg-bg-green z-0"></div>
                                <CommonPartsEarningRate
                                    :earning="item.targetModelSuccessEarningRate.truncateDecimal(10)"
                                    :size="20"
                                    class="relative"
                                />
                            </div>
                        </div>
                        <div class="flex-1 flex justify-center">
                            <div>
                                <CommonPartsEarningRate
                                    :earning="item.totalModelSuccessEarningRate.truncateDecimal(10)"
                                    :size="20"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="model-overall average flex flex-col items-center w-20">
                <div class="image model-image-lg">
                    <NuxtImg
                        :src="`${$config.public.IMAGE_URL}version2/model-image/large/${'models'}.png`"
                        alt="model"
                        width="68"
                        height="56"
                        loading="lazy"
                        format="webp"
                    />
                </div>
                <div class="text-body-4 mt-1 h-7 flex items-center justify-center">전체 평균</div>
            </div>
        </div>
        <SignDetailFluidContent1Sub
            v-if="item"
            :modelName="item.modelTopsEarningRateResponse.modelName"
            :modelId="item.modelId"
            :cryptoCode="item.modelTopsEarningRateResponse.digitalAssetsCode"
            :items="item.modelTopsEarningRateResponse.modelEarningRateItems"
        />
    </div>
</template>

<script lang="ts" setup>
import type { SignDetailContent } from '~/composables/sign-detail/service/_types';


defineProps<{
    title?: string;
    titleType?: 'string' | 'html';
    item: SignDetailContent | null;
}>();
</script>