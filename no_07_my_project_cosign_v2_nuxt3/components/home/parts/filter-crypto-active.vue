<template>
    <div v-if="isActive" class="active-circle absolute xy-center w-[42px] h-[42px] border-system-green border-[3px] rounded-full">
        <div class="check-icon absolute -right-1 -bottom-[3px] w-6 h-6 bg-white border-system-green border-2 rounded-full flex justify-center items-center">
            <div class="w-4"><IconCheckSm fill="#1ED470" /></div>
        </div>
    </div>
</template>

<script lang="ts" setup>

defineProps<{
    isActive: boolean;
}>();

</script>