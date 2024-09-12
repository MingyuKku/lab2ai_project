<template>
    <div class="home-index-page min-h-viewScreen pb-space-page-bottom bg-bg-white">
        <HomeFilter
            :list="cryptoList"
            :refresh="signIdListRefresh"
            :updateCryptoViewList="updateCryptoViewList"
        />
        <div ref="itemWrapperRef" class="item-list-wrap">
            <div
                v-if="signItemList?.length"
                v-for="(sign,idx) in signItemList"
                :key="sign.signId"
                class="border-border-gray-02 border-b-[1px] last:border-none"
            >
                <HomeCardItem
                    :key="sign.signId"
                    class="bg-bg-white"
                    v-bind:data-code="sign.cryptoCurrencyItem.digitalAssetsCode"
                    :itemIndex="idx"
                    :item="sign"
                    :isLast="idx === signItemList.length - 1"
                    :signItemListRefresh="idx === signItemList.length - 1 ? signItemListRefresh : undefined"
                    :imageBase="config.public.IMAGE_URL"
                    :socket-messages="socketMessages"
                />
                <HomeCardAd
                    v-if="!sign.ticket && (idx !== 0 && idx % 9 === 0)"
                    class="border-border-gray-02 border-t-[1px] pt-space-top-lg pb-space-top-lg"
                />
            </div>
            <ClientOnly>
                <div v-if="!signItemList?.length && !signIdListPending && !signItemListPending" class="no-content">
                    <HomeNoContent />
                </div>
            </ClientOnly>
        </div>
        <LazyHomeScrollTopButton />
    </div>
</template>


<script lang="ts" setup>
import { piniaFilterMethods } from '~/pinia/home/piniaFilterMethods';
import { useFetchHome } from '~/composables/home/service/useFetchHome';
import { useCryptoList } from '~/composables/home/service/useCryptoList';
import { HOME_SIGN_ID_LIST, HOME_SIGN_ITEMS } from '~/composables/_app/asyncDataFetchKeys';
import { useMetaHead } from '~/composables/_app/useMetaHead';
import { useUpbitSocket } from '~/composables/home/business/useUpbitSocket';


definePageMeta({
    middleware: 'filter-url',
});


const { setMetaOg } = useMetaHead();
const config = useRuntimeConfig();
const { getHomeSignIdList, getHomeSignItemList } = useFetchHome();
const { filterParams } = piniaFilterMethods();

setMetaOg({
    title: '특허받은 AI 모델로 예측하는 현물/선물 가상화폐 시세 예측',
    description: '특허 받은 AI가 분석하여 예측해 주는 코인 시장 정보와 매수ㆍ매도가 결정이 힘든 개인 투자자들을 위해 코싸인 AI모델이 가장 적절한 매수ㆍ매도가를 알려드립니다.'
})


const {
    data: signIdList,
    pending: signIdListPending,
    refresh: signIdListRefresh,
} = await useAsyncData(HOME_SIGN_ID_LIST, () => getHomeSignIdList(HOME_SIGN_ID_LIST, filterParams));


const {
    data: signItemList,
    pending: signItemListPending,
    refresh: signItemListRefresh,
} = await useAsyncData(HOME_SIGN_ITEMS, () => getHomeSignItemList(HOME_SIGN_ITEMS, signIdList.value), { watch: [signIdList] });


const { cryptoList, updateCryptoViewList } = await useCryptoList();
const { connectUpbit, socketMessages } = useUpbitSocket(cryptoList);


onMounted(() => {
    connectUpbit();
})

</script>