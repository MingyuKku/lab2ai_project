<template>
    <div class="footer px-primary py-[15px] bg-bg-white">
        <div class="caution-info text-[10px] text-justify">
            <p>{{ $I.footer.warning }}</p>
         </div>
        <CommonFooterAwardsCertifications />
        <div class="info mt-5">
            <div class="foot_logoImg w-[72px] mb-2.5 mx-auto">
                <a href="https://lab2ai.com/" target="_blank">
                    <NuxtImg
                        src="https://kr.object.ncloudstorage.com/cosign/version2/common/lab2ai-bi.png"
                        alt="lab2ai"
                        format="webp" loading="lazy" 
                        width="72" height="26"
                        class="grayscale-0 group-filter"
                    />
                </a>
            </div>
            <ul class="text-center">
                <li
                    v-for="item,idx in menuList" :key="idx"
                    class="inline-block after:inline-block after:content-[''] after:w-[1px] after:h-3 after:mx-2.5 after:align-[-1px] after:bg-border-dark-02 last:after:content-none"
                >
                    <NuxtLink
                        v-if="item.href"
                        :to="item.href"
                        class="text-cap-1r" 
                    >{{ item.label }}</NuxtLink>
                    <!-- <span
                        v-if="item.onClick"
                        class="text-cap-1r cursor-pointer" @click.stop="item.onClick()"
                    >{{ item.label }}</span> -->
                </li>
            </ul>
            <ul class="company text-center text-cap-2m mt-5">
                <li class="inline-block after:inline-block after:content-[''] after:w-[1px] after:h-3 after:mx-2.5 after:align-[-1px] after:bg-border-dark-02">{{ $I.footer.company }}</li>
                <li class="inline-block after:inline-block after:content-[''] after:w-[1px] after:h-3 after:mx-2.5 after:align-[-1px] after:bg-border-dark-02">{{ $I.footer.ceo }}: {{ $I.footer.ceoName }}</li>
                <li class="inline-block after:inline-block after:content-[''] after:w-[1px] after:h-3 after:mx-2.5 after:align-[-1px] after:bg-border-dark-02 last:after:hidden">{{ $I.footer.companyNumber }}: 372-86-00568</li>
            </ul>
            <p class="text-center text-cap-2m mt-2">Copyright © Lab2AI Corp. All rights reserved.</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useMenuList } from '~/composables/menu/business/useMenuList';


const { menuList } = useMenuList();



</script>