<template>
    <div
        class="default-layout min-h-viewScreen"
    >
        <div
            class="app-content-wrapper"
        >
            <div
                class="view-content-wrap"
            >
                <div class="page">
                    <slot />
                </div>
                <!-- <CommonNavMainNavBar
                    v-if="isNav"
                /> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
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