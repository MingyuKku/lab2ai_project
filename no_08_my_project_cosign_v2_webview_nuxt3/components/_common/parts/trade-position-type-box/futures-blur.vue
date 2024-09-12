<template>
    <div v-if="size === 'medium'" class="futures-position-blur relative w-[76px] h-[25px] rounded overflow-hidden isolate">
        <div class="absolute w-full h-full flex justify-center items-center bg-position-long futures-blur-animate">
            <IconObjectLock />
            <span class="text-body-4 text-font-white long mx-0.5">Long</span>
        </div>
        <div class="absolute w-full h-full flex justify-center items-center bg-position-short futures-blur-animate-reverse opacity-0">
            <IconObjectLock />
            <span class="text-body-4 text-font-white short mx-0.5">Short</span>
        </div>
    </div>
    <div v-if="size === 'small'" class="futures-position-blur relative w-[72px] h-6 rounded overflow-hidden isolate">
        <div class="absolute w-full h-full flex justify-center items-center bg-position-long futures-blur-animate">
            <IconObjectLock />
            <span class="text-cap-1m text-font-white long mx-0.5 mb-px">Long</span>
        </div>
        <div class="absolute w-full h-full flex justify-center items-center bg-position-short futures-blur-animate-reverse opacity-0">
            <IconObjectLock />
            <span class="text-cap-1m text-font-white short mx-0.5 mb-px">Short</span>
        </div>
    </div>
</template>

<script lang="ts" setup>

defineProps<{
    size: 'small' | 'medium';
}>();

</script>