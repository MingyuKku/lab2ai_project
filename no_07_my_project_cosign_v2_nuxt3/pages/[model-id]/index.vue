<template>
    <div class="model-detail-page bg-bg-gray-04 min-h-viewScreen pt-app-header">
        <CommonHeadersAppHeader>
            <template #left>
                <div class="flex items-center">
                    <CommonHeadersBackHeaderIcon />
                    <h1 class="text-h2 ml-1">{{ headerData.modelName }}</h1>
                    <CommonPartsTradeType v-if="headerData.tradeType" :trade-type="headerData.tradeType" class="ml-2" />
                </div>
            </template>
            <template #right>
                <div @click="onClickBell" class="flex items-center cursor-pointer">
                    <IconObjectBell />
                    <span class="text-body-4 text-font-dark-01">알림</span>
                </div>
            </template>
        </CommonHeadersAppHeader>
        <div class="model-info-area bg-bg-white mb-2">
            <AimodelDetailProfile :profile="profile" />
            <AimodelDetailFluidContent
                title="최근 높은 수익 SIGN"
                :modelid="(modelid as string)"
                :modelType="profile?.modelType"
            />
        </div>
        <div class="sign-list-wrap px-primary pt-space-top-lg pb-space-page-bottom bg-bg-white">
            <h1 class="text-h2">SIGN</h1>
            <AimodelDetailSignlistItemFilter
                :refetch="refresh"
                :updateSignlistRefreshed="updateSignlistRefreshed"
                class="pt-3"
            />
            <!-- :style="{'height': `${signlistRefHeight}px`}" -->
            <div
                v-if="signItems && signItems.signList.length"
                class="aimodel-detail-signlist"
                
            >
                <div ref="signlistRef">
                    <AimodelDetailSignlistItem
                        v-for="(item,idx) in signItems.signList"
                        :key="idx"
                        :item="item"
                        :adShow="idx !== 0 && idx % 10 === 0"
                        :isLast="signItems ? (signItems.signList.length -1) === idx : false"
                        :dynamicFetchKey="dynamicFetchKey"
                        :updateSignlistRefreshed="(signItems && (signItems.signList.length -1) === idx) ? updateSignlistRefreshed : undefined"
                        :refresh="(signItems && (signItems.signList.length -1) === idx) ? moreRefresh : undefined"
                        :imageBase="config.public.IMAGE_URL"
                    />
                </div>
            </div>
            <AimodelDetailNoSignlist v-if='!pending && (!signItems || !signItems.signList.length)' />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { piniaDetailFilterMethods } from '~/pinia/aimodel/piniaDetailFilterMethods';
import { useFetchAimodelDetail } from '~~/composables/aimodel-detail/service/useFetchAimodelDetail';
import { useHeader } from '~~/composables/aimodel-detail/business/useHeader';
import { MODEL_DETAIL, MODEL_DETAIL_SIGN_LIST } from '~/composables/_app/asyncDataFetchKeys';
import { piniaPopup } from '~/pinia/popup/piniaPopup';
import { useModelDetailMetaHeadOg } from '~/composables/aimodel-detail/business/useModelDetailMetaHeadOg';


// definePageMeta({
//     middleware: 'filter-url',
// });


const config = useRuntimeConfig();
const { getModelDetailSignlist } = useFetchAimodelDetail();
const { params } = useRoute();
const { modelid } = params;


const { filterParams } = piniaDetailFilterMethods();
const { headerData, updateHeaderData } = useHeader();


const { getModelDetail } = useFetchAimodelDetail();


const modelProfileDynamicFetchKey = `${MODEL_DETAIL}-${modelid}`;
const {
    data: profile,
} = await useAsyncData(
    modelProfileDynamicFetchKey,
    () => getModelDetail(modelProfileDynamicFetchKey, modelid as string)
)


updateHeaderData({
    modelName: profile.value?.modelName ?? null,
    tradeType: profile.value?.modelType ?? null
});
useModelDetailMetaHeadOg(profile.value);


const isSignlistRefreshed = ref(false);
const dynamicFetchKey = `${MODEL_DETAIL_SIGN_LIST}-${modelid}`;
const {
    data: signItems,
    pending,
    refresh,
} = await useAsyncData(
    dynamicFetchKey,
    () => getModelDetailSignlist(dynamicFetchKey, filterParams, modelid as string, isSignlistRefreshed.value)
)


const moreRefresh = async () => {
    await refresh();
}


const updateSignlistRefreshed = (value: boolean) => {
    isSignlistRefreshed.value = value;
}

const onClickBell = () => {
    const { toggleAppDownloadPopupFlag } = piniaPopup();
    toggleAppDownloadPopupFlag(true, `
        알림설정은 앱에서 가능합니다.
    `);
}

onUnmounted(() => {
    // piniaDetailServiceData().clearSortingData();
    // piniaDetailServiceData().updateIsLastList(null);
})

</script>
