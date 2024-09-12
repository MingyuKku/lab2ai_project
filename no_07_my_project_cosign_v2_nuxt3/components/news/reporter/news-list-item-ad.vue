<template>
    <div class="content-box block rounded-primary border border-border-gray-03 rounded-lg">
        <div class="top-content flex items-center -translate-y-1/2 -mb-3 ml-2.5">
            <div class="profile-image w-11 h-11 rounded-full overflow-hidden border border-[#e4e6eb] bg-bg-white">
                <NuxtImg
                    :src="`${$config.public.IMAGE_URL}ai-persona/news/ai_persona_character/face_img/ad.png`"
                    alt="썸네일"
                    format="webp"
                    loading="lazy"
                    width="44"
                    height="44"
                />
            </div>
            <div class="type flex items-center justify-center px-2.5 mx-[5px] rounded-full border border-[#e4e6eb] h-7 bg-bg-white">
                <div class="good flex items-center text-body-4">
                    <span class="icon mr-[3px] -mt-0.5">{{ Emoji.player.uniCode }}</span>
                    <span class="font-normal text-font-dark-02 -mt-0.5">{{ $I.labels.ad }}</span>
                </div>
            </div>
        </div>
        <CommonAd
            class="px-2.5 pb-2.5 min-h-[100px]"
            :adsense="{
                slot: '9304818062',
                layoutKey: '-hx-f+j-56+dp',
                format: 'fluid',
                style: {
                    'display': 'block'
                }
            }"
            :adfit="{
                src: '//t1.daumcdn.net/kas/static/ba.min.js',
                unit: 'DAN-KDdABnWHtenM4S8r',
                width: '320',
                height: '100',
                // width: '320',
                // height: '50',
            }"
        />
    </div>
</template>

<script lang="ts" setup>
import { Emoji } from '~/composables/news/business/emoji';


</script>