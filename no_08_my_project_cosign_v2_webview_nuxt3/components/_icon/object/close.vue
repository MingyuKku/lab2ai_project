<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3.0498 3.05029L12.9493 12.9498" :stroke="fill ?? 'black'" stroke-width="2"/>
        <path d="M12.9502 3.05029L3.0507 12.9498" :stroke="fill ?? 'black'" stroke-width="2"/>
    </svg>
</template>

<script lang="ts" setup>

defineProps<{
    fill?: string;
}>();
</script>