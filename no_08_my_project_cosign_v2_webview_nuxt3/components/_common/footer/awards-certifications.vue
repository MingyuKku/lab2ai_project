<template>
    <div class="awards-certificatioons mt-5">
        <ul class="flex items-center justify-between">
            <li
                v-for="item,idx in awardsAndCertifications" :key="idx"
                class="text-center mr-2.5"
            >
                <div class="bi h-10">
                    <NuxtImg
                        :src="item.src" 
                        alt="icon" 
                        format="webp" loading="lazy" 
                        class="inline-block w-auto h-full"
                        width="62" height="40"
                    />
                </div>
                <span class="break-keep mt-[5px] text-[8px]">{{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>


<script lang="ts" setup>

const VERSION = '2.0.0'
const awardsAndCertifications = [
    {
        name: '2022 대한민국인공지능대상',
        src: `https://kr.object.ncloudstorage.com/cosign/version2/common/foot_bi_1.png?ver=${VERSION}`,
    },
    {
        name: '대-스타 해결사 플랫폼 선정',
        src: `https://kr.object.ncloudstorage.com/cosign/version2/common/foot_bi_2.png?ver=${VERSION}`,
    },
    {
        name: '성남산업진흥원 지원 사업 선정',
        src: `https://kr.object.ncloudstorage.com/cosign/version2/common/foot_bi_3.png?ver=${VERSION}`,
    }
]

</script>