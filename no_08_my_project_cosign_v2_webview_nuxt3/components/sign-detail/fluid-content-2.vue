<template>
    <div class="fluid-content-2 bg-bg-white pt-space-top-lg pb-space-bottom-lg">
        <h1 class="text-h3 px-primary">{{ title }}</h1>
        <div v-if="items && items.length"  class="mt-space-top-md">
            <Swiper
                :modules="[
                    SwiperPagination
                ]"
                :pagination="{
                    type: 'bullets'
                }"
                :enabled="(2 > 1 ? true : false)"
                :auto-height="true"
                :speed="300"
                :threshold="1"
                :slidesPerView="'auto'"
                :spaceBetween="0"
                class="sign-detail-fluid-content-2-swiper"
            >
                <SwiperSlide
                    v-for="item,idx in items"
                    :key="idx"
                    class="px-primary pb-2"
                >
                    <SignDetailFluidContent2Card
                        :item="item"
                        :imageBase="imageBase"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
        <div v-else class="bg-bg-white px-primary pt-space-top-md">
            <div class="no-content border border-border-gray-03 rounded-lg overflow-hidden flex flex-col items-center p-[20px]">
                <div class="image w-[60px]">
                    <NuxtImg
                        src="https://kr.object.ncloudstorage.com/cosign/version2/common/no-content.jpg"
                        alt="no-content"
                        width="60" height="50"
                    />
                </div>
                <div class="text-body-5 text-center mt-2">
                    <p>다른 AI 모델에서는</p>
                    <p>진행 중인 예측 SIGN이 없습니다.</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import type { ClassAnotherModelSignItem } from '~/composables/sign-detail/service/_types';


defineProps<{
    title: string;
    items?: ClassAnotherModelSignItem[];
}>();

const config = useRuntimeConfig();
const imageBase = config.public.IMAGE_URL;

</script>