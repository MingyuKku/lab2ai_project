<template>
    <div>
        <p>{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { useAppErrorHandler } from '~/composables/_error/useAppErrorHandler';

const { error } = defineProps<{
  error: any;
}>();

useAppErrorHandler(error.message);

</script>