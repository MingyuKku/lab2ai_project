<template>
    <div @click="cryptoListPopupToggle" class="modal fixed top-0 left-0 z-40 w-full h-viewScreen"></div>
</template>

<script lang="ts" setup>

defineProps<{
    cryptoListPopupToggle: () => void;
}>();
</script>