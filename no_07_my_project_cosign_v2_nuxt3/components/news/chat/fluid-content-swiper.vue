<template>
    <Swiper
        :modules="[
            SwiperFreeMode
        ]"
        :freeMode="{
            enabled: true,
            sticky: true,
            momentumVelocityRatio: 0.8,
        }"
        :speed="250"
        :threshold="1"
        :slidesPerView="'auto'"
        @init="init"
        @update="updateSwiper"
        :style="{
            'padding-left': '16px',
            'padding-right': '16px',
        }"
    >
        <SwiperSlide 
            v-for="item in items" :key="item.aiPersonaNewsId" 
            :style="{'width': `${slidePer}%`}"
        >
            <NuxtLink
                :to="`${item.aiPersonaNewsId}`"
                class="inner block mr-2.5 border border-border-gray-04 rounded-lg overflow-hidden bg-bg-white"
            >
                <div
                    class="top-bg relative bg-cover bg-no-repeat bg-center py-[30%]" 
                    :style="item.newsTitleImg ? {'background-image': `url(${item.newsTitleImg})`} : undefined"
                >
                    <div class="top-content absolute bottom-0 left-2.5 flex items-center translate-y-1/2">
                        <div 
                            class="profile-image w-11 h-11 rounded-full overflow-hidden border border-border-gray-04 mr-[5px]"
                            :style="{'background-color': `#${item.characterProfileBackgroundCode}`}"
                        >
                            <NuxtImg
                                :src="item.characterProfileImg" 
                                alt="썸네일"
                                format="webp" 
                                loading="lazy"
                                width="44"
                                height="44"
                            />
                        </div>
                        <div v-if="item.newsPositiveNegativeType !== 'NORMAL'" class="type flex items-center justify-center px-3 rounded-full border border-border-gray-04 h-[26px] bg-bg-white">
                            <div v-if="item.newsPositiveNegativeType === 'POSITIVE'" class="good flex items-center text-body-4">
                                <span class="icon mr-[3px]">{{ Emoji.positive.uniCode }}</span>
                                <span class="font-normal text-font-dark-02">{{ $I.labels.goodNews }}</span>
                            </div>
                            <div v-if="item.newsPositiveNegativeType === 'NEGATIVE'" class="bad flex items-center text-body-4">
                                <span class="icon mr-[3px]">{{ Emoji.negative.uniCode }}</span>
                                <span class="font-normal text-font-dark-02">{{ $I.labels.badNews }}</span>
                            </div> 
                        </div>
                    </div>
                </div>
                <div class="bottom-content py-3 px-2.5 pt-[30px]">
                    <div
                        class="text line-clamp-3"
                        :class="item.newsPositiveNegativeType !== 'NORMAL' ? 'h-[63px]' : 'h-7'"
                    >
                        <p class="text-justify text-body-3 font-normal break-words break-all">{{ item.newsDisplayTitle }}</p>
                    </div>
                </div>
            </NuxtLink>
        </SwiperSlide>
        <SwiperSlide 
            :style="{
                'min-width': '252px',
                'width': `${slidePer}%`
            }"
        >
            <div class="ad-wrap border border-border-gray-04 rounded-lg overflow-hidden bg-bg-white mr-2.5 w-full h-full">
                <CommonAd
                    class="text-center"
                    :adsense="{
                        slot: '4816028279',
                        layout: 'in-article',
                        format: 'fluid',
                        style: {
                            'display': 'block',
                            'text-align': 'center'
                        }
                    }"
                    :adfit="{
                        src: '//t1.daumcdn.net/kas/static/ba.min.js',
                        unit: 'DAN-tmdDIlP8Toavncut',
                        width: '250',
                        height: '250',
                    }"
                />
            </div>
        </SwiperSlide>
        <SwiperSlide :style="{'width': 'auto'}">
            <div class="inner flex items-center justify-center p-3 w-full h-full">
                <NuxtLink
                    :to="`/news/${reporterid}`"
                    class="more-button flex items-center py-[18px] pl-[22px] pr-primary border border-border-gray-04 rounded-full cursor-pointer"
                >
                    <span class="text-body-1">{{ $I.labels.more }}</span>
                    <IconDirectionMd fill="black" class="ml-0.5" />
                </NuxtLink>
            </div>
        </SwiperSlide>
    </Swiper>
</template>

<script lang="ts" setup>
import type { AiPersonaNewsListItem } from '~/composables/news/service/_types';
import { Emoji } from '~~/composables/news/business/emoji';

const { items } = defineProps<{
    items: AiPersonaNewsListItem[];
}>();


const { params } = useRoute();
const { reporterid } = params;

const slidesPerView = 1.5;
const slidePer = (100 / slidesPerView);



function init(swiper: any) {
    // if (items[0].newsPositiveNegativeType === 'NORMAL') return;
    
    updateSlideHeight(swiper);
}

function updateSwiper(swiper: any) {
    // if (items[0].newsPositiveNegativeType === 'NORMAL') return;
    
    updateSlideHeight(swiper);
}


function updateSlideHeight(swiper: any) {
    const wrapperElHeight = swiper.wrapperEl.offsetHeight;
    const adSlideIdx = swiper.slides.length - 2;

    swiper.slides[adSlideIdx].style.height = wrapperElHeight + 'px';
    swiper.slides[swiper.slides.length - 1].style.height = wrapperElHeight + 'px';
}


</script>