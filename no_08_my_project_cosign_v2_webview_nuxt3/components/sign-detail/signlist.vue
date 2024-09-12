<template>
    <div class="sign-detail-signlist bg-bg-white px-primary pt-space-top-lg pb-space-bottom-lg">
        <h1 class="text-h3">{{ title }}</h1>
        <div class="mt-space-between-y-sm">
            <SignDetailSignlistItem
                v-for="(item, idx) in items"
                :key="idx"
                :item="item"
                class="border-b border-border-gray-04 last:border-none"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { RecentSignList } from '~/composables/sign-detail/service/_types';


defineProps<{
    title: string;
    items: RecentSignList[];
}>();

</script>