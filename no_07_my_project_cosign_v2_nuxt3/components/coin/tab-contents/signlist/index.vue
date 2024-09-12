<template>
    <div class="coin-detail-tab-contents-signlist px-primary pb-space-page-bottom">
        <CoinTabContentsSignlistFilter
            :fetchKey="dynamicKey"
            :refetch="moreRefresh"
        />
        <div class="list-wrap">
            <CoinTabContentsSignlistItem
                v-if="signs?.signList.length"
                v-for="(item,idx) in signs?.signList"
                :key="idx"
                :item="item"
                :adShow="idx !== 0 && idx % 10 === 0"
                :isLast="signs ? (signs.signList.length -1) === idx : false"
                :isMoreEnd="signs?.isLast"
                :refresh="(signs && (signs.signList.length -1) === idx) ? moreRefresh : undefined"
                :imageBase="imageBase"
            />
            <div v-else class="no-sign pb-[140px]"><AimodelDetailNoSignlist /></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { CryptoDetailInfo } from '~/composables/coin/tv-tech-chart/services/_types';
import { piniaCoinTabNav } from '~/pinia/coin/tab-contents/piniaCoinTabNav';
import { CRYPTO_DETAIL_SIGN_LIST } from '~/composables/_app/asyncDataFetchKeys';
import { piniaCryptoDetailPageSignlist } from '~/pinia/sign-filters/piniaCryptoDetailPageSignlist';
import { useFetchSignlist } from '~/composables/coin/tab-contents/service/useFetchSignlist';

const {
    cryptoInfo,
    // updateAutoHeight,
} = defineProps<{
    // updateAutoHeight: () => void,
    cryptoInfo: CryptoDetailInfo;
}>();

const config = useRuntimeConfig();
const imageBase = config.public.IMAGE_URL;


const { getCryptoDetailSignlist } = useFetchSignlist();
const { filterParams } = piniaCryptoDetailPageSignlist();
// const contentName = useQueryContentName();

const dynamicKey = `${CRYPTO_DETAIL_SIGN_LIST}-${cryptoInfo.cryptoCurrencyItem.digitalAssetsId}`;
const {
    data: signs,
    refresh
} = await useAsyncData(
    dynamicKey,
    () => getCryptoDetailSignlist(dynamicKey, filterParams, cryptoInfo.cryptoCurrencyItem.digitalAssetsId)
)

const moreRefresh = async () => {
    await refresh();
    // updateAutoHeight();
}

// onMounted(() => {
//     updateAutoHeight();
// })



</script>