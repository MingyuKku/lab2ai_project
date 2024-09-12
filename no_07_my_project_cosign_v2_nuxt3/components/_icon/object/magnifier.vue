<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="13" cy="13" r="6.75" :stroke="fill ?? '#000'" stroke-width="2.5"/>
        <path d="M18.5 18.5L24 24" :stroke="fill ?? '#000'" stroke-width="2.5"/>
    </svg>
</template>

<script lang="ts" setup>

defineProps<{
    fill?: string;
}>();


</script>