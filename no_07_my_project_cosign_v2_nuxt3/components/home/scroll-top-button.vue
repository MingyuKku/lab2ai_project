<template>
    <div class="scroll-top-button fixed bottom-0 z-30 bg-font-black h-main-nav flex items-center justify-center"
        :class="!isMobile ? 'w-desktop' : 'w-full left-0'"
    >
        <div
            @click="onClickScrollTopButton"
            class="absolute flex items-center justify-center right-4 bottom-full -translate-y-[30px] w-10 h-10 bg-bg-white rounded-full shadow-light-01 cursor-pointer border border-border-gray-04"
        >
            <IconArrowLg fill="#646464" />
        </div>
    </div>
</template>

<script lang="ts" setup>

const { isMobile } = useDevice();

const onClickScrollTopButton = () => {
    window.scrollTo({
        top: 0
    })
}
</script>