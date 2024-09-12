<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 6L7.64645 9.64645C7.84171 9.84171 8.15829 9.84171 8.35355 9.64645L12 6" :stroke="fill ?? '#4B5058'" stroke-linecap="round"/>
    </svg>
</template>

<script lang="ts" setup>

defineProps<{
    fill?: string;
}>();

</script>