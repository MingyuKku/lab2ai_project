<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size ?? 16" :height="size ?? 16" viewBox="0 0 16 16" fill="none">
        <path d="M11 7V4.5C11 3.11929 9.88071 2 8.5 2V2C7.11929 2 6 3.11929 6 4.5V7" :stroke="fill ?? 'white'"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 6C4.44772 6 4 6.44772 4 7V12C4 12.5523 4.44772 13 5 13H12C12.5523 13 13 12.5523 13 12V7C13 6.44772 12.5523 6 12 6H5ZM9 8H8V11H9V8Z" :fill="fill ?? 'white'"/>
    </svg>
</template>

<script lang="ts" setup>

defineProps<{
    size?: number;
    fill?: string;
}>();
</script>