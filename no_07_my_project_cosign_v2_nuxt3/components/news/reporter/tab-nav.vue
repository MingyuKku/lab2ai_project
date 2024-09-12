<template>
    <div class="reporter-tab-list-wrap pb-primary pt-6">
        <Swiper 
            :style="{'padding-left': '16px', 'padding-right': '16px'}"
            :modules="[
                SwiperFreeMode
            ]"
            :enabled="(items?.length > 1 ? true : false)"
            :freeMode="true"
            :speed="300"
            :threshold="10"
            :slidesPerView="'auto'"
            :spaceBetween="8"
            @init="swiperInit"
        >
            <SwiperSlide v-for="tab in items" :key="tab.aiPersonaCharacterId" :style="{'width': 'auto'}">
                <NuxtLink
                    :to="`${tab.aiPersonaCharacterId}`"
                    class="relative flex items-center justify-center h-[35px]"
                >
                    <CommonPartsTabLabel
                        :label="tab.characterDisplayName"
                        :active="Number(tab.aiPersonaCharacterId) === Number($route.params.reporterid)"
                    />
                    <!-- <h2
                        class="relative z-[1] text-body-4 px-3"
                        :class="Number(tab.aiPersonaCharacterId) === Number($route.params.reporterid) ? 'text-system-mint' : 'text-font-dark-03'"
                    >{{ tab.characterDisplayName ?? 'anonymous' }}</h2>
                    <div
                        class="absolute top-0 left-0 w-full h-full border rounded-lg"
                        :class="Number(tab.aiPersonaCharacterId) === Number($route.params.reporterid) ? 'border-system-mint bg-bg-green' : 'border-bg-gray-02'"
                    ></div> -->
                </NuxtLink>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script lang="ts" setup>
import type { AiPersonaReporter } from '~/composables/news/service/_types';

const { items } = defineProps<{
    items: AiPersonaReporter[];
}>();


const swiperInit = (swiper: any) => {
    const { params } = useRoute();
    const { reporterid } = params;
    const tabIndex = items.findIndex(item => item.aiPersonaCharacterId === Number(reporterid));
    swiper.slideTo(tabIndex, 200);
}


</script>