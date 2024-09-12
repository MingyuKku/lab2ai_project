<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 23H26M6 16H26M6 9H26" :stroke="fill ??'#BCBEC2'" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>

<script lang="ts" setup>

defineProps<{
    fill?: string;
}>();

</script>