<template>
    <div class="discover-report-nav mt-space-between-y-sm">
        <div class="flex items-center px-primary">
            <CommonPartsTabLabel
                v-for="(nav, idx) in items.items" :key="idx"
                @click="onClickNavItem(idx)"
                :label="nav.label"
                :active="items.activeIndex === idx"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { DiscoverNavItems } from '~/composables/discover/chart-report/business/_types';
import * as SwiperModule from 'swiper';

const props = defineProps<{
    items: DiscoverNavItems;
    updateActiveIndex: (index: number) => void;
    swiperRef: SwiperModule.Swiper | null;
}>();


const onClickNavItem = (idx: number) => {
    const { updateActiveIndex, swiperRef } = props;
    updateActiveIndex(idx);
    if (swiperRef) swiperRef.slideTo(idx);
}

</script>