<template>
    <div class="flex">
        <div class="earning-box py-1 px-2 border-[1.5px] border-system-mint rounded flex items-center whitespace-nowrap">
            <span class="text-cap-1r text-font-dark-02">수익률</span>
            <span class="text-price-14b text-p&l-profit-02 ml-0.5">{{ earning }}</span>
            <span class="text-[10px] text-p&l-profit-02 leading-none mt-0.5">%</span>
        </div>
    </div>
</template>

<script lang="ts" setup>

defineProps<{
    earning?: number | string;
}>();


</script>