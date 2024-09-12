<template>
    <div
        :class="active ? 'bg-bg-black text-font-white' : 'bg-bg-gray-04 text-font-dark-03'"
        class="tab-label-common flex items-center h-9 px-primary text-body-3 rounded-lg cursor-pointer mr-2 last:mr-0"
    >
        {{ label }}
    </div>
</template>

<script lang="ts" setup>

defineProps<{
    label: string;
    active: boolean;
}>();
</script>