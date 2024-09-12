<template>
    <div class="recommend-list px-primary pt-5">
        <h1 class="text-h6">추천 검색</h1>
        <ul class="recommendCoin-list mt-3">
            <li
                v-for="item,idx in tickers"
                :key="item.cryptoFullCode"
                class="mb-3.5 last:mb-0"
            >
                <NuxtLink
                    :to="`/coin/${recomendList[idx].cryptoId}`"
                    class="flex items-center justify-between py-0.5"
                >
                    <div class="left-content flex items-center">
                        <div class="coin-image w-[30px] h-[30px] mr-2">
                            <NuxtImg
                                :src="`${$config.public.IMAGE_URL}coin-image/v1/${recomendList[idx].digitalAssetsId}.png`"
                                :alt="recomendList[idx].digitalAssetsCode"
                                width="30" height="30"
                                format="webp"
                                loading="lazy"
                            />
                        </div>
                        <div class="coinName">
                            <h2 class="text-body-3">{{ recomendList[idx].digitalAssetsDisplayKrName }}</h2>
                            <h3 class="text-cap-1r text-font-dark-03 mt-0.5">{{ item.digitalAssetsCode }}</h3>
                        </div>
                    </div>
                    <div class="right-content text-right">
                        <p class="text-price-14b mb-1">{{ item.trade_price_Text }}<span class="text-cap-2m ml-px">원</span></p>
                        <!-- <p
                            class="text-price-12r" 
                            :class="{'text-position-long': item.signed_change_rate > 0, 'text-position-short': item.signed_change_rate < 0}">
                        {{ item.signed_change_rate_fixed }}%</p> -->
                        <CommonPartsEarningRate :earning="item.signed_change_rate_fixed" :size="13" :class="{'text-position-long': item.signed_change_rate > 0, 'text-position-short': item.signed_change_rate < 0}" class="inline-block" />
                    </div>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { useFetchMarkets, recomendList } from '~/composables/search/services/useFetchMarkets';

const tickers = await useFetchMarkets();


</script>