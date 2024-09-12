<template>
    <div class="p-4 bg-orange-100">
        <div class="flex justify-between">
            <div class="flex flex-col">
                <p>{{ item.email }}</p>
                <p>{{ item.gender }}</p>
                <p>{{ item.cell }}</p>
                <p>{{ item.location.city }}</p>
                <p>{{ item.location.country }}</p>
                <p>{{ item.location.street.name }}</p>
            </div>
            <div class="w-[200px]">
                <NuxtImg
                    :src="item.picture.large"
                    alt="image"
                    format="webp"
                    width="200"
                    height="200"
                    loading="lazy"
                />
            </div>
        </div>
        
    </div>
</template>

<script lang="ts" setup>

defineProps<{
    item: any;
}>();




</script>