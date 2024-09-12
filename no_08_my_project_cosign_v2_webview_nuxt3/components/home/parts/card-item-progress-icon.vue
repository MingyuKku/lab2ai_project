<template>
    <div class="card-item-progress-icon">
        <div
            v-if="iconType === 'SUCCESS'"
            class="flex items-center justify-center w-[34px] h-[34px] border-2 rounded-full bg-bg-white"
            :class="{'shadow-05': shadow}"
            :style="{
                'border-color': iconColor
            }"
        >
            <div class="w-3.5">
                <IconBrandCosign2 :fill="iconColor" />
            </div>
        </div>
        
        <div
            v-if="iconType === 'TARGET'"
            class="flex items-center justify-center w-[34px] h-[34px] border-2 rounded-full bg-bg-white"
            :style="{
                'border-color': iconColor
            }"
        >
            <div class="w-3.5">
                <IconBrandCosign2 fill="#D7DADE" />
            </div>
        </div>
        <div
            v-if="iconType === 'WAIT'"
            class="flex items-center justify-center w-[34px] h-[34px] border-2 border-border-gray-01 rounded-full bg-bg-white"
        >
            <div class="w-3.5">
                <IconBrandCosign2 fill="#D7DADE" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

defineProps<{
    iconType: 'SUCCESS' | 'TARGET' | 'WAIT';
    iconColor: string;
    shadow?: boolean;
}>();



</script>