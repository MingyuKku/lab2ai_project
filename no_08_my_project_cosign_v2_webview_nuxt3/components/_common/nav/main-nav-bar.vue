<template>
    <div
        class="main-nav-bar fixed bottom-0 z-30 bg-font-black h-main-nav flex items-center justify-center w-full left-0"
    >
        <div class="inner-content flex-1 flex items-center justify-around">
            <NuxtLink
                v-for="(item, idx) in navItems" 
                :key="idx"
                :to="item.to"
                @click="item.click && $route.name !== item.name ? item.click() : undefined"
                class="nav-icon-wra flex-1 relative flex items-center justify-center flex-col"
            >
                <div
                    v-if="item.isCenter && routeName === item.name"
                    class="active-bg absolute z-[1] xy-center w-12 h-12 flex items-center justify-center rounded-full bg-nav-sign-gra"
                >
                    <IconNavActiveSign class="mb-0.5"/>
                </div>
                <div
                    class="icon-wrap relative flex items-center justify-center w-8"
                >
                    <component :is="routeName === item.name ? item.activeComponent : item.component"></component>
                </div>

                <span
                    v-if="routeName !== item.name || !item.isCenter"
                    class="text-[11px] mt-1"
                    :class="routeName === item.name ? 'font-medium text-white' : 'text-font-dark-03'"
                >{{ item.label }}</span>
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { BEST_PREDICT_MODEL_LIST, HOME_SIGN_ID_LIST, HOME_SIGN_ITEMS } from '~/composables/_app/asyncDataFetchKeys';


// const { isMobile } = useDevice();

const routeName = computed(() => {
    const { name } = useRoute();
    return name;
})


const navItems = [
    // {
    //     to: `/news/1`,
    //     component: resolveComponent('IconNavAiReporter'),
    //     activeComponent: resolveComponent('IconNavActiveAiReporter'),
    //     label: 'AI 기자단',
    //     name: 'news-reporterid',
    //     click: () => {
    //         const keys = getCharacterNuxtDataKeys();
    //         if (keys) clearNuxtData(keys);
    //     }
    // },
    {
        to: `/discover`,
        component: resolveComponent('IconNavDiscover'),
        activeComponent: resolveComponent('IconNavActiveDiscover'),
        label: '디스커버',
        name: 'discover',
    },
    {
        isCenter: true,
        to: `/`,
        component: resolveComponent('IconNavSign'),
        activeComponent: resolveComponent('IconNavActiveSign'),
        label: 'SIGN',
        name: 'index',
        click: () => {
            clearNuxtData(HOME_SIGN_ID_LIST);
            clearNuxtData(HOME_SIGN_ITEMS);
        }
    },
    {
        to: `/aimodel`,
        component: resolveComponent('IconNavAiModel'),
        activeComponent: resolveComponent('IconNavActiveAiModel'),
        label: 'AI 모델',
        name: 'aimodel',
        click: () => {
            clearNuxtData(BEST_PREDICT_MODEL_LIST);
        }
    },
    {
        to: `/menu`,
        component: resolveComponent('IconNavMenu'),
        activeComponent: resolveComponent('IconNavActiveMenu'),
        label: '메뉴',
        name: 'menu',
    },
]

</script>