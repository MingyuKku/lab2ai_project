<template>
    <div class="faq-category-list px-primary whitespace-nowrap overflow-y-auto no-scrollbar">
        <div
            v-for="item,idx in faqCategoryList" :key="idx"
            @click="onClickCategory(idx)"
            class="inline-block mr-2.5 last:mr-0"
        >
            <NuxtLink
                :to="{
                    path: `/customer/faq/`,
                    query: {
                        [routeQueryPage]: 1, // 페이지는 첫번째 페이지로 초기화
                        [routeQueryCategory]: item.categoryType,
                    }
                }"
                :replace="true"
                class="flex items-center justify-center px-primary h-9 text-cap-1r rounded-full border border-border-gray-04 cursor-pointer"
                :class="activeIndex === idx ? 'font-medium text-font-white bg-bg-black' : 'font-normal text-font-dark-02'"
            >
                {{ item.label }}
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { FaqCategoryItem } from '~/composables/customer/business/_types';
import { routeQueryPage, routeQueryCategory } from '~/composables/customer/business/constant';

const faqCategoryList: FaqCategoryItem[] = [
    {
        label: '전체',
        categoryType: 'all',
    },
    {
        label: '서비스이용',
        categoryType: 'SERVICE_USAGE',
    },
    {
        label: '계정',
        categoryType: 'ACCOUNT',
    },
    {
        label: '결제',
        categoryType: 'PAYMENT',
    },
    {
        label: '제휴',
        categoryType: 'PARTNERSHIP',
    },
    // {
    //     label: '안내',
    //     categoryType: null,
    // },
]


const { query } = useRoute();
const initActiveNavIndex = computed(() => faqCategoryList.findIndex((item) => item.categoryType === query[routeQueryCategory]))
const activeIndex = ref(initActiveNavIndex.value);

const onClickCategory = (idx: number) => {
    activeIndex.value = idx;
}
</script>