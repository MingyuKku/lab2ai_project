<template>
    <div v-if="size === 'medium'" class="futures-position-type-box flex items-center justify-center w-[75px] h-[26px] rounded" :class="bgColorClass">
        <p class="text-body-4 text-font-white">{{ label }}</p>
        <p class="text-price-13m text-font-white ml-px">{{ leverage ?? 128 }}<span class="text-body-4">X</span></p>
    </div>
    <div v-if="size === 'small'" class="futures-position-type-box w-[72px] h-6 rounded flex items-center justify-center text-cap-1m text-font-white" :class="bgColorClass">
        <p>{{ label }}</p>
        <p class=" ml-px">{{ leverage ?? 128 }}<span>X</span></p>
    </div>
</template>

<script lang="ts" setup>

defineProps<{
    bgColorClass?: string;
    bgColor?: string;
    label?: string;
    leverage?: number | string | null;
    size: 'small' | 'medium';
}>();

</script>