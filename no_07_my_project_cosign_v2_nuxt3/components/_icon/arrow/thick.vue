<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M19.9026 12.1478C20.0319 12.0308 20.0319 11.8228 19.9026 11.7057L13.0443 5.5C12.8606 5.33384 12.5732 5.4687 12.5732 5.72103V8.01081H5V15.8428H12.5732V18.1325C12.5732 18.3848 12.8606 18.5197 13.0443 18.3535L19.9026 12.1478Z" :fill="fill ?? '#00B387'"/>
    </svg>
</template>

<script lang="ts" setup>

defineProps<{
    width?: string;
    height?: string;
    fill?: string;
}>();


</script>