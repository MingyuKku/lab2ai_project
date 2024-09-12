<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 14L12 8L6 2" :stroke="fill ?? 'white'" stroke-width="2"/>
    </svg>
</template>

<script lang="ts" setup>

defineProps<{
    fill?: string;
}>();

</script>