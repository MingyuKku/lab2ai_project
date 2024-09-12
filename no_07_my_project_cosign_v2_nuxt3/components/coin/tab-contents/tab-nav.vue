<template>
    <div class="coin-detail-page-tab-contents-nav relative flex items-center">
        <div
            v-for="nav,idx in coinDetailTabNav" :key="nav.name"
            @click="onClickTabNav(nav.name)"
            class="flex-1 cursor-pointer"
        >
            <div
                ref="linkRefs"
                class="relative h-12 flex items-center justify-center"
                :class="tabIndex === nav.name ? 'active text-h4' : 'text-body-1 text-font-dark-02'"
            >
                <h2 v-if="nav.labelType === 'text'">{{ nav.label }}</h2>
                <div
                    v-if="nav.icon"
                    class="w-[39px]"
                    :class="{'grayscale': tabIndex !== nav.name}"
                >
                    <NuxtImg
                        :src="nav.icon"
                        alt="sign"
                        width="39" height="17"
                        loading="lazy"
                        format="webp"
                    />
                </div>
                <span
                    v-if="tabIndex === nav.name"
                    :class="tabIndex === nav.name ? 'h-0.5' : 'h-px'"
                    class="active line absolute bottom-px left-0 w-full bg-bg-black"
                ></span>
            </div>
        </div>
        <span class="line absolute bottom-0 left-0 w-full h-px bg-border-gray-05"></span>
        <!-- <span
            class="active line absolute bottom-0 left-0 w-20 h-px bg-bg-black transition-transform"
            :style="piniaCoinTabNav().computedStyle"
        ></span> -->
    </div>
</template>

<script lang="ts" setup>
import type { CryptoDetailPageQueryContentsType } from '~/composables/coin/tab-contents/business/_types';
import { coinDetailTabNav } from '~/composables/coin/tab-contents/business/variables';
import type { TradeExchangeType } from '~/composables/home/service/_types';
import { piniaCoinTabNav } from '~/pinia/coin/tab-contents/piniaCoinTabNav';

const { 
    exchange,
    tabIndex,
    onClickTabNav,
 } = defineProps<{
    exchange?: TradeExchangeType;
    tabIndex: CryptoDetailPageQueryContentsType | null;
    onClickTabNav: (type: CryptoDetailPageQueryContentsType) => void;
}>();

</script>