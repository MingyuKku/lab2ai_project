<template>
    <div class="family-site px-primary py-[15px]">
        <ul class="flex items-center justify-around">
            <li v-for="item,idx in sites" :key="idx">
                <a 
                    :href="item.href"
                    class="flex flex-col items-center"
                >
                    <div class="image w-[38px] h-[38px]">
                        <NuxtImg
                            :src="item.imgUrl"
                            alt="icon"
                            width="38" height="38"
                            format="webp"
                            loading="lazy"
                        />
                    </div>
                    <span class="text-cap-2m mt-2">{{ item.label }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>

const sites = [
    {
        href: 'https://www.lab2ai.com/',
        label: '회사 홈페이지',
        imgUrl: 'https://kr.object.ncloudstorage.com/cosign/version2/common/sns-lab2ai.png'
    },
    {
        href: 'https://t.me/cosignai',
        label: '공식 텔레그램',
        imgUrl: 'https://kr.object.ncloudstorage.com/cosign/version2/common/sns-telegram.png'
    },
    {
        href: 'https://www.instagram.com/cosign.cc/',
        label: '공식 인스타그램',
        imgUrl: 'https://kr.object.ncloudstorage.com/cosign/version2/common/sns-instgram.png'
    },
    {
        href: 'https://www.youtube.com/channel/UCZe96FhZXFeCOu8oWU70-5w',
        label: '공식 유튜브',
        imgUrl: 'https://kr.object.ncloudstorage.com/cosign/version2/common/sns-youtube.png'
    },
]

</script>