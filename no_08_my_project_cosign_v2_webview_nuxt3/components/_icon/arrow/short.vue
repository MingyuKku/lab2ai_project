<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M8 15L14 9L8 3" :stroke="fill ?? 'black'" stroke-width="2"/>
        <path d="M14 9H2.5" :stroke="fill ?? 'black'" stroke-width="2"/>
    </svg>
</template>

<script lang="ts" setup>

defineProps<{
    fill?: string;
}>();
</script>