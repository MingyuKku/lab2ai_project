<template>
    <div
        class="indicator-circle-box w-[20px] h-[20px] rounded-full flex items-center justify-center"
        :class=" isActive ? 'bg-price-profit shadow-03' : 'border-2 border-border-gray-03'"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>

defineProps<{
    isActive: boolean;
}>();
</script>