<template>
    <div
        class="page-loading-viwe fixed top-0 z-40 h-viewScreen flex items-center justify-center bg-bg-black/[0.36]"
        :class="isMobile ? 'w-full left-0' : 'w-desktop'"
    >
        <div class="circle-loader"></div>
    </div>
</template>

<script lang="ts" setup>

const { isMobile } = useDevice();

</script>