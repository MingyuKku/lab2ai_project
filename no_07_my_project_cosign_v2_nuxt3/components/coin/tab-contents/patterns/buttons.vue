<template>
    <div
        class="nav-buttons-wrap whitespace-nowrap px-primary"
        :class="isDesktop ? 'custom-scroll-bar-slim pb-1.5' : 'overflow-x-auto'"
    >
        <div
            v-for="button in buttons" :key="button.patternScanId"
            @click="setPatternId(button.patternScanId)"
            class="cursor-pointer transition-none inline-block mr-2 last:mr-0" 
        >
            <div
                class="h-8 rounded-lg px-3.5 flex items-center justify-center text-body-4"
                :class="button.patternScanId === selectedButtonPatternId ? 'bg-bg-black text-font-white' : 'bg-bg-gray-04 text-font-dark-03'"
            >
                {{ button.patternName }}
            </div>
        </div>
        
        <!-- <Swiper
            class="pattern-capture-nav-swiper"
            :modules="[SwiperFreeMode]"
            :slidesPerView="'auto'"
            :spaceBetween="8"
            :speed="300"
            :threshold="1"
            :freeMode="true"
            :style="{
                'padding-left': '16px',
                'padding-right': '16px',
            }"
        >
            <SwiperSlide
                v-for="button in buttons" :key="button.patternScanId"
                :pattern-id="button.patternScanId"
                class="cursor-pointer transition-none" 
                @click="setPatternId(button.patternScanId)"
                :style="{'width': 'auto'}"
            >
                <div
                    class="h-8 rounded-lg px-3.5 flex items-center justify-center text-body-4"
                    :class="button.patternScanId === selectedButtonPatternId ? 'bg-bg-black text-font-white' : 'bg-bg-gray-04 text-font-dark-03'"
                >
                    {{ button.patternName }}
                </div>
            </SwiperSlide>
        </Swiper> -->
    </div>
</template>
<script lang='ts' setup>
import type { IPatternButton } from "~/composables/coin/tv-tech-chart/services/_types";

const { isDesktop } = useDevice();
const { buttons, selectedButtonPatternId, setPatternId } = defineProps<{
    buttons: IPatternButton[];
    selectedButtonPatternId: number;
    setPatternId: (patternScanId: number) => void;
}>();

</script>
