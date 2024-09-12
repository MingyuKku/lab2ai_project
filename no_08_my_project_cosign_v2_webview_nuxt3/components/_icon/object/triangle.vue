<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 3" fill="none">
        <path d="M2 0L3.73205 3H0.267949L2 0Z" :fill="fill ?? '#BCBEC2'"/>
    </svg>
</template>

<script lang="ts" setup>

defineProps<{
    fill?: string;
}>();
</script>