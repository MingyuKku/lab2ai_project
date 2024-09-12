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
                    <component
                        v-if="item.href"
                        :is="item.isNuxtRoute ? defineNuxtLink({}) : 'div'"
                        :to="item.isNuxtRoute ? item.href : undefined"
                        @click="item.isNuxtRoute ? undefined : onClickMenu(item.href)"
                        class="text-cap-1r inline-block" 
                    >{{ item.label }}</component>
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
import { messageWebview } from '~/composables/_app/useFlutterWebview';

const { menuList } = useMenuList();

const onClickMenu = (href: string) => {
    messageWebview(href)
}

</script>