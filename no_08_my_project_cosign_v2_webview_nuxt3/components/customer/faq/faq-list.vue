<template>
    <div class="faq-list pb-space-bottom-md">
        <section>
            <ul>
                <li
                    v-for="item,idx in data?.content" :key="idx"
                    @click="onClickItem(idx)"
                    :class="activeItemIndex === idx ? 'h-auto' : 'h-11'"
                    class="overflow-hidden"
                >
                    <div
                        class="title flex items-center justify-between h-11 px-primary cursor-pointer"
                    >
                        <div class="left flex items-center text-body-3r">
                            <span class="mr-1 shrink-0 self-start">[{{ computedLabel(item.categoryType) }}]</span>
                            <p :class="activeItemIndex === idx ? 'font-medium' : 'font-normal'">{{ item.title }}</p>
                        </div>
                        <div class="right ml-2.5">
                            <IconDirectionMd
                                class="p-0.5"
                                :class="activeItemIndex === idx ? '-rotate-90' : 'rotate-90'"
                                fill="#000"
                            />
                        </div>
                    </div>
                    <div class="accordion pb-2">
                        <div class="bg-bg-gray-04 px-primary py-3">
                            <div class="text-cap-1r leading-5" v-html="item.content"></div>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <ClientOnly>
            <div v-if="data" class="paginate-wrap flex justify-center items-center py-primary">
                <VueAwesomePaginate
                    v-model="page"
                    :total-items="data.totalPages"
                    :items-per-page="1"
                    :max-pages-shown="5"
                    :show-breakpoint-buttons="true"
                    :disable-breakpoint-buttons="true"
                    :hide-prev-next-when-ends="true"
                    :on-click="faqPageHandler"
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
import type { CategoryType, QuestionList } from '~/composables/customer/service/_types';
import { routeQueryPage, routeQueryCategory } from '~/composables/customer/business/constant';

const props = defineProps<{
    data: QuestionList | null;
    activeItemIndex: number | null;
    updateActiveItemIndex: (idx: number | null) => void;
}>();


const computedPage = computed(() => Number(useRoute().query[routeQueryPage]) ?? 1);
const page = ref(computedPage.value);

// 라우터 쿼리 변경시 page변수의 정확한 참조를 위해서
watch(() => useRoute().query[routeQueryPage], (newPage) => {
    page.value = Number(newPage);
})


const computedLabel = computed(() => {
    return (type: CategoryType) => {
        if (type === 'PAYMENT') return '결제';
        if (type === 'NOTIFICATION') return '공지';
        if (type === 'SERVICE_USAGE') return '서비스이용';
        if (type === 'ACCOUNT') return '계정';
        if (type === 'PARTNERSHIP') return '제휴';
        return null;
    }
})

const { push } = useRouter();

const faqPageHandler = (page: number) => {
    const { query } = useRoute();

    push(`/customer/faq/?${routeQueryPage}=${page}&${routeQueryCategory}=${query[routeQueryCategory]}`)
}


const onClickItem = (idx: number) => {
    const { activeItemIndex, updateActiveItemIndex } = props;

    if (activeItemIndex === idx) updateActiveItemIndex(null);
    else updateActiveItemIndex(idx);
}


</script>