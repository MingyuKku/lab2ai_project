<template>
    <div class="question-mark">
        <IconObjectQuestionBox v-for="r,idx in count ?? 3" :key="idx" class="inline-block mr-px last:mr-0" />
    </div>
</template>

<script lang="ts" setup>

defineProps<{
    count?: number;
}>();
</script>