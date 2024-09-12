<template>
    <div class="customer-notice-list px-primary">
        <ul class="notice-list-wrap mb-primary">
            <li
                v-for="item,idx in items?.content" :key="idx"
            >
                <NuxtLink
                    :to="`/customer/notice/${item.id}`"
                    class="flex justify-center flex-col h-16"
                >
                    <p class="date text-cap-1r text-font-dark-03 mb-1">{{ createdAtComputed(item.createdAt) }}</p>
                    <h1 class="truncate text-body-3r mr-1">{{ item.title }}</h1>
                </NuxtLink>
            </li>
        </ul>
        <ClientOnly>
            <div v-if="items" class="paginate-wrap flex justify-center items-center py-primary">
                <VueAwesomePaginate
                    v-model="page"
                    :total-items="items.totalPages"
                    :items-per-page="1"
                    :max-pages-shown="5"
                    :show-breakpoint-buttons="true"
                    :disable-breakpoint-buttons="true"
                    :hide-prev-next-when-ends="true"
                    :on-click="noticePageHandler"
                    class="text-body-3r text-font-dark-03"
                >
                    <template #prev-button><IconDirectionMd fill="#929AA5" class="p-px -rotate-180" /></template>
                    <template #next-button><IconDirectionMd fill="#929AA5" class="p-px" /></template>
                </VueAwesomePaginate>
            </div>
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>
import { routeQueryPage } from '~/composables/customer/business/constant';
import type { NoticeList } from '~/composables/customer/service/_types';


defineProps<{
    items: NoticeList | null;
}>();


const computedPage = computed(() => Number(useRoute().query[routeQueryPage]) ?? 1);
const page = ref(computedPage.value);

const createdAtComputed = computed(() => {
    return (createdAt: string) => {
        return Date.parseUtcToLocal(createdAt).format('yyyy-MM-dd HH:mm')
    }
})


const noticePageHandler = (page: number) => {
    navigateTo(`/customer/notice/?${routeQueryPage}=${page}`);
}


</script>