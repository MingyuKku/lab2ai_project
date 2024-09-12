<template>
    <div class="search-result-crypto-list px-primary py-6">
        <div v-for="(item,idx) in items" :key="idx" class="mb-3 last:mb-0">
            <NuxtLink
                :to="`/coin/${item.cryptoId}`"
                @click="storageAdd({
                    cryptoCurrencyId: item.cryptoId,
                    digitalAssetsId: item.digitalAssetsId,
                    digitalAssetsCode: item.digitalAssetsCode,
                    cryptoFullCode: item.cryptoFullCode,
                    digitalAssetsKoName: item.digitalAssetsDisplayKrName
                })"
                class="flex items-center py-0.5"
            >
                <div class="coin-image w-[30px] h-[30px] mr-2">
                    <NuxtImg
                        :src="`${imageBase}coin-image/v1/${item.digitalAssetsId}.png`" 
                        :alt="item.cryptoFullCode"
                        width="30" height="30"
                        format="webp"
                        loading="lazy"
                    />
                </div>
                <h2 class="text-body-3">
                    <span
                        v-for="word,idx in item.digitalAssetsKoNameSplit" :key="idx" 
                        :class="{'text-system-mint': item.highlightIndexNumbers.digitalAssetsKoNameIndex.includes(idx)}"
                        class="text-highlight"
                    >{{ word }}
                    </span>
                </h2>
                <h3 class="text-body-3r text-font-dark-03 ml-[5px]">
                    <span
                        v-for="word,idx in item.digitalAssetsCodeSplit" :key="idx"
                        :class="{'text-system-mint': item.highlightIndexNumbers.digitalAssetsCodeIndex.includes(idx)}"
                    >{{ word }}</span>
                </h3>
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ClassSearchItem } from '~/composables/search/services/_types';
import { useLocalStorage } from '~/composables/search/business/useLocalStorage';


defineProps<{
    items: ClassSearchItem[];
    imageBase: string;
}>();

const { storageAdd } = useLocalStorage();


</script>