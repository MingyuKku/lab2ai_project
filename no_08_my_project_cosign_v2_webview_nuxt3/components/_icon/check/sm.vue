<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
        <path d="M3 8L7 11L13.5 2.5" :stroke="fill ?? 'white'" stroke-width="2"/>
    </svg>
</template>


<script lang="ts" setup>

defineProps<{
    fill?: string;
}>();


</script>