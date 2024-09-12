<template>
    <div
        class="default-layout min-h-viewScreen"
        :class="{ 'flex justify-center': !isMobile }"
    >
        <div
            class="app-content-wrapper"
            :class="{ 'flex justify-between' : !isMobile }"
        >
            <CommonDesktopVisualAlways v-if="!isMobile" />
            <div
                class="view-content-wrap"
                :class="{ 'w-desktop': !isMobile }"
            >
                <div class="page" :class="{'pb-main-nav': isNav}">
                    <slot />
                </div>
                <CommonNavMainNavBar
                    v-if="isNav"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { isMobile } = useDevice();

const navPage = [
    'index',
    'news-reporterid',
    'discover',
    'aimodel',
    'community',
    'menu',
]

const isNav = computed(() => {
    const { name } = useRoute();
    if (navPage.some(page => page === name)) {
        return true;
    }
    return false;
})


</script>