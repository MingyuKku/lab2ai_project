<template>
    <p class="text-center">
        <span class="text-price-17b" :style="{'font-size': `${size ?? 14}px`}">{{ earning }}</span>
        <span class="text-price-13m font-normal" :class="noUnitMargin ? 'ml-0' : 'ml-0.5'" :style="{'font-size': `${computedPercent}px`}">%</span>
    </p>
</template>

<script lang="ts" setup>

const { size } = defineProps<{
    earning: number | string;
    size?: number;
    noUnitMargin?: boolean;
}>();


const computedPercent = computed(() => {
    if (size) {
        return Math.max(Math.round(size * 0.7), 11);
    } else {
        return 10;
    }
    
})

</script>