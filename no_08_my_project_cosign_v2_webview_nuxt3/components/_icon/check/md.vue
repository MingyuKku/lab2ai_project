<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5 11L10 16L19 7" :stroke="fill ?? 'white'" stroke-width="2"/>
    </svg>
</template>

<script lang="ts" setup>

defineProps<{
    fill?: string;
}>();


</script>