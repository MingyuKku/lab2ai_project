<template>
    <div
        class="absolute z-50 bg-bg-white top-full translate-y-1 w-full pt-primary shadow-02 rounded-lg"
    >
        <div class="small-header flex items-center justify-between mb-3 px-primary">
            <h1 class="text-body-3">SIGN 진행 전체 코인</h1>
            <div @click="cryptoListPopupToggle" class="cursor-pointer">
                <IconObjectClose />
            </div>
        </div>
        <div class="grid grid-cols-5 justify-items-center gap-y-4 max-h-[248px] pb-primary custom-scroll-bar-basic px-2">
            <div
                v-for="(item,idx) in items"
                :key="idx"
                @click="onClickCryptoFilter(item.digitalAssetsId)"
                class="item flex items-center justify-center flex-col w-11 cursor-pointer"
            >
                <div class="crypto-image relative w-9 h-[42px] flex justify-center items-center">
                    <div class="image w-9 h-9 bg-center bg-no-repeat bg-cover" :style="imageBg(item.digitalAssetsId)"></div>
                    <HomePartsFilterCryptoActive :is-active="filterParams.digitalAssetsId === item.digitalAssetsId" />
                </div>
                <span class="mt-0.5" :class="filterParams.digitalAssetsId === item.digitalAssetsId ? 'text-cap-1b' : 'text-cap-1r'">{{ item.digitalAssetsCode }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { piniaFilterMethods } from '~/pinia/home/piniaFilterMethods';
import { useFilterData } from '~/composables/home/business/useFilterData';
// import { useFilterCryptoListPopup } from '~/composables/home/business/useFilterCryptoListPopup';
import type { CryptoFilterItem } from '~/composables/home/service/_types';
import { useHomeFilterCookies } from '~/composables/useCookie/home-filter';


const { items, refresh, cryptoListPopupToggle, updateCryptoViewList, imageBase } = defineProps<{
    items: CryptoFilterItem[];
    refresh: () => Promise<void>;
    cryptoListPopupToggle: () => void;
    updateCryptoViewList: (digitalAssetsId: number) => void;
    imageBase: string;
}>();

const { filterParams } = piniaFilterMethods();
const { filterChangeCommon } = useFilterData();


const onClickCryptoFilter = async (digitalAssetsId: number) => {
    const { setCookie_crypto } = useHomeFilterCookies();
    
    setCookie_crypto(digitalAssetsId);

    const filterParam = {
        'digitalAssetsId': digitalAssetsId
    }

    filterChangeCommon(filterParam, refresh);
    updateCryptoViewList(digitalAssetsId);
    cryptoListPopupToggle();
}

// const { controlPopupClassName } = useFilterCryptoListPopup({
//     popupToggle: cryptoListPopupToggle
// });

const imageBg = computed(() => {
    return (digitalAssetsId: number) => {
        return {
            'background-image': `url(${imageBase}coin-image/v1/${digitalAssetsId}.png)`
        }
    }
})

</script>