<template>
    <div class="aimodel-page bg-bg-gray-04">
        <AimodelListTopRankModel
            v-if="bestModels"
            class="mb-2"
            :items="bestModels"
        />
        <div class="bg-bg-white pt-space-top-lg pb-space-page-bottom">
            <AimodelListItemFilter
                :refresh="refresh"
            />
            <div class="model-list">
                <AimodelListItem
                    v-for="(item,idx) in models"
                    :key="item.modelId"
                    :item="item"
                    :lazyLoad="idx > 2"
                    class="border-b-[1px] border-border-gray-02 last:border-none"
                />
            </div>
            <div class="mt-space-top-lg">
                <CommonAd
                    class="bg-bg-white min-h-[250px] text-center"
                    :adsense="{
                        slot: '1979979584',
                        widthResponsive: true,
                        format: 'auto',
                        style: {
                            'display': 'block',
                        }
                    }"
                    :adfit="{
                        src: '//t1.daumcdn.net/kas/static/ba.min.js',
                        unit: 'DAN-wuYXw0ExdVRW7LX5',
                        width: '300',
                        height: '250',
                    }"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { BEST_PREDICT_MODEL_LIST, PREDICT_MODEL_LIST } from '~/composables/_app/asyncDataFetchKeys';
import { useMetaHead } from '~/composables/_app/useMetaHead';
import { useFetchAimodel } from '~/composables/aimodel/service/useFetchAimodel';
import { piniaModelListFilterMethods } from '~/pinia/aimodel/piniaModelListFilterMethods';



const { filterParams } = piniaModelListFilterMethods();
const { getBestModelList, getModelList } = useFetchAimodel();

const { setMetaOg } = useMetaHead();
setMetaOg({
    title: '특허받은 AI 모델, 다양한 알고리짐의 AI 모델',
    description: '다양한 데이타 분석과 알고리즘으로 현물/선물 시세 예측을 합니다.'
})

const {
    data: bestModels,
    pending,
    status,
} = await useAsyncData(
    BEST_PREDICT_MODEL_LIST,
    () => getBestModelList(BEST_PREDICT_MODEL_LIST)
)

const {
    data: models,
    pending: modelsPending,
    refresh
} = await useAsyncData(
    PREDICT_MODEL_LIST,
    () => getModelList(PREDICT_MODEL_LIST, filterParams)
)

</script>