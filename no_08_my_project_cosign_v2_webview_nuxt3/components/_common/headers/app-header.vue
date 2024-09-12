<template>
    <div
        class="app-header fixed top-0 z-30 h-app-header px-primary flex items-center justify-center bg-white border-b border-border-gray-05 w-full left-0"
    >
        <div class="inner-content flex-1 flex items-center justify-between">
            <div class="left">
                <slot name="left"></slot>
            </div>
            <div class="righjt">
                <slot name="right"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>


const { isMobile } = useDevice();


</script>