<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6 15L9 18L12 15" stroke="black" :stroke-width="strokeWidth ?? '1'" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13 9L16 6L19 9" stroke="black" :stroke-width="strokeWidth ?? '1'" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 18V6" stroke="black" :stroke-width="strokeWidth ?? '1'" />
        <path d="M16 18V6" stroke="black" :stroke-width="strokeWidth ?? '1'" />
    </svg>
</template>

<script lang="ts" setup>

defineProps<{
    strokeWidth?: string;
}>();


</script>