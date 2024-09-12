<template>
    <div class="crypto-filter-list relative">
        <LazyHomeFilterCryptoListModal
            v-if="popupFlag"
            :cryptoListPopupToggle="cryptoListPopupToggle"
        />
        <LazyHomeFilterCryptoListPopup
            v-if="popupFlag"
            :items="list.total"
            :refresh="refresh"
            :cryptoListPopupToggle="cryptoListPopupToggle"
            :updateCryptoViewList="updateCryptoViewList"
            :imageBase="$config.public.IMAGE_URL"
        />
        <div class="items flex items-center">
            <div
                @click="onClickCryptoFilter(0)"
                class="cosign-bi-item flex items-center justify-center flex-col w-11 mr-3 cursor-pointer"
            >
                <div class="crypto-image w-9 h-[42px] flex justify-center items-center">
                    <div class="icon relative w-9 h-9 bg-black rounded-full flex justify-center items-center">
                        <IconBrandCosign class="w-7" />
                        <HomePartsFilterCryptoActive :is-active="filterParams.digitalAssetsId === 0" />
                    </div>
                </div>
                <span class="mt-0.5" :class="filterParams.digitalAssetsId === 0 ? 'text-cap-1b' : 'text-cap-1r'">All</span>
            </div>
            <div
                v-for="(item,idx) in list.view"
                :key="idx"
                @click="onClickCryptoFilter(item.digitalAssetsId)"
                class="item flex items-center justify-center flex-col w-11 mr-3 cursor-pointer"
            >
                <div class="crypto-image relative w-9 h-[42px] flex justify-center items-center">
                    <NuxtImg
                        :src="`${$config.public.IMAGE_URL}coin-image/v1/${item.digitalAssetsId}.png`"
                        :alt="item.digitalAssetsCode"
                        format="webp"
                        width="36"
                        height="36"
                    />
                    <HomePartsFilterCryptoActive :is-active="filterParams.digitalAssetsId === item.digitalAssetsId" />
                </div>
                <span class="mt-0.5" :class="filterParams.digitalAssetsId === item.digitalAssetsId ? 'text-cap-1b' : 'text-cap-1r'">{{ item.digitalAssetsCode }}</span>
            </div>
            <div
                v-if="list.total.length >= 5"
                @click="cryptoListPopupToggle"
                class="home-filter-crypto-list-more-item flex items-center justify-center flex-col cursor-pointer"
            >
                <div class="icon-wrap w-[42px] h-[42px] flex justify-center items-center">
                    <div
                        class="w-8 h-8 rounded-full flex items-center justify-center"
                        :class="popupFlag ? 'border-2 border-bg-black' : 'border border-border-gray-01'"
                    >
                        <IconDirectionMd :class="popupFlag ? '-rotate-90' : 'rotate-90'" :fill="popupFlag ? '#000000' : '#4B5058'" />
                    </div>
                </div>
                <span class="text-cap-1r mt-0.5">전체 보기</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { CryptoListReactiveData, SignIdListParams } from '~/composables/home/service/_types';
import { piniaFilterMethods } from '~/pinia/home/piniaFilterMethods';
import { useHomeFilterCookies } from '~/composables/useCookie/home-filter';
import { useFilterData } from '~/composables/home/business/useFilterData';
import { HOME_SIGN_ID_LIST } from '~/composables/_app/asyncDataFetchKeys';
import { useReplaceRedirect } from '~/composables/_app/useReplaceRedirect';


const props = defineProps<{
    list: CryptoListReactiveData;
    refresh: () => Promise<void>;
    updateCryptoViewList: (digitalAssetsId: number) => void;
}>();


const { filterParams, changeFilterParams } = piniaFilterMethods();
// const { filterChangeCommon } = useFilterData();
// const { changeQueryParams } = useReplaceRedirect();

const onClickCryptoFilter = async (digitalAssetsId: number) => {
    // const { setCookie_crypto } = useHomeFilterCookies();
    
    // setCookie_crypto(digitalAssetsId);

    const filterParam = {
        'digitalAssetsId': digitalAssetsId
    }

    changeFilterParams(filterParam);
    // changeQueryParams<SignIdListParams>(filterParam);
    clearNuxtData(HOME_SIGN_ID_LIST);
    if (props.refresh) props.refresh();
    // filterChangeCommon(filterParam, props.refresh);
}


const popupFlag = ref(false);
const cryptoListPopupToggle = () => {
    popupFlag.value = !popupFlag.value;
}


if (filterParams.digitalAssetsId) {
    // 라우터 퀴리 기반으로 필터 리스트 UI 뷰를 업데이트 시킨다
    props.updateCryptoViewList(filterParams.digitalAssetsId);
}

</script>