<template>
    <div
        class="donut-graph-wrap mr-[5%] relative rounded-full after:content-[''] after:absolute after:xy-center after:w-[45%] after:h-[45%] after:bg-white after:rounded-full"
        :style="{
            width: `${size}px`,
            height: `${size}px`,
            background: !disable ? `conic-gradient(#F74B68 0% ${leftRate}%, #19C49A ${leftRate}% ${100 - leftRate}%)` : '#ddd'
        }"
    >
    </div>
</template>

<script lang="ts" setup>

defineProps<{
    size: number | string;
    leftRate: number;
    rightRate: number;
    disable?: boolean;
}>()
</script>

