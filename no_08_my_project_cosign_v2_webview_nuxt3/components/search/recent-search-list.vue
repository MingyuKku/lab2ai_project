<template>
    <div class="recent-search-cryptolist px-primary py-6">
        <div class="title flex items-center justify-between mb-2.5">
            <h1 class="text-h6">최근 검색</h1>
            <span
                v-if="recentSearchCryptoList.length > 0"
                class="text-cap-1r text-[#9B9B9B] cursor-pointer" @click="storageRemove()"
            >전체 지우기</span>
        </div>
        <ul v-if="recentSearchCryptoList.length > 0">
            <li v-for="item,idx in recentSearchCryptoList" :key="idx" class="flex items-center justify-between mb-3 last:mb-0">
                <NuxtLink
                    :to="`/coin/${item.cryptoCurrencyId}`"
                    class="left-content flex items-center py-0.5"
                >
                    <div class="coin-image w-[30px] h-[30px] mr-2">
                        <NuxtImg
                            :src="`${imageBase}coin-image/v1/${item.digitalAssetsId}.png`" 
                            :alt="item.digitalAssetsCode"
                            width="30" height="30"
                            format="webp"
                            loading="lazy"
                        />
                    </div>
                    <h2 class="text-body-3">{{ item.digitalAssetsKoName }}</h2>
                    <h3 class="text-body-3r text-bg-dark-03 ml-[5px]">{{ item.digitalAssetsCode }}</h3>
                </NuxtLink>
                <span class="right-content cursor-pointer" @click="storageDelete(idx)">
                    <IconObjectClose fill="#929AA5" />
                </span>
            </li>
        </ul>
        
        <div v-else class="no-recent flex items-center justify-center p-10">
            <div class="flex items-center">
                <div class="w-4"><IconObjectInfo /></div>
                <p class="text-body-3r text-[#9B9B9B] ml-1">최근 검색한 코인이 없습니다.</p>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { useLocalStorage } from '~/composables/search/business/useLocalStorage';

defineProps<{
    imageBase: string;
}>();

const { recentSearchCryptoList, storageLoad, storageRemove, storageDelete } = useLocalStorage();

onMounted(() => {
    storageLoad();
})


</script>