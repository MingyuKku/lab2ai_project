<template>
    <div v-if="size === 'medium'" class="spot-position-type-box flex items-center justify-center w-[75px] h-[26px] rounded bg-font-dark-01">
        <p class="text-body-4 text-font-white">현물</p>
    </div>
    <div v-if="size === 'small'" class="spot-position-type-box w-[72px] h-6 rounded bg-font-dark-01 flex items-center justify-center">
        <IconObjectLock class="-ml-0.5" />
        <p class="text-cap-1m text-font-white ml-0.5">현 물</p>
    </div>
</template>

<script lang="ts" setup>

defineProps<{
    size: 'small' | 'medium';
}>();

</script>