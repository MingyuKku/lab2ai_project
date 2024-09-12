<template>
    <div class="qna-list pb-space-bottom-md">
        <section>
            <ul>
                <li
                    v-for="item,idx in data?.content" :key="idx"
                    @click="onClickItem(idx)"
                    :class="activeItemIndex === idx ? 'h-auto' : 'h-16'"
                    class="overflow-hidden"
                >
                    <div class="title flex items-center justify-between h-16 cursor-pointer px-primary">
                        <div class="left text-body-3r overflow-hidden">
                            <div class="flex items-center">
                                <div class="answer-state py-0.5 px-1.5 rounded border border-border-gray-01 text-font-dark-01" :class="{'border-position-long': item.answerCk}">
                                    <span class="text-cap-1r leading-[0]" :class="{'text-position-long': item.answerCk}">{{ answerCkText(item.answerCk) }}</span>
                                </div>
                                <span class="date text-body-5 text-font-dark-03 ml-2">{{ createdAtText(item.createdAt) }}</span>
                            </div>
                            <p class="truncate mt-1.5">{{ item.content }}</p>
                        </div>
                        <div class="right ml-2.5">
                            <IconDirectionMd
                                class="p-0.5"
                                :class="activeItemIndex === idx ? '-rotate-90' : 'rotate-90'"
                                fill="#000"
                            />
                        </div>
                    </div>
                    <div class="accordion bg-bg-gray-04">
                        <CustomerQnaContent
                            :content="item.content"
                            :answer="item.answerInquiryData"
                            :siteInquiryFile="item.siteInquiryFile"
                        />
                    </div>
                </li>
            </ul>
        </section>
        <ClientOnly>
            <div v-if="data && data.content.length" class="paginate-wrap flex justify-center items-center py-primary">
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
import { routeQueryPage } from '~/composables/customer/business/constant';
import type { QnaList, QnaListContent } from '~/composables/customer/service/_types';


const props = defineProps<{
    data: QnaList | null;
    activeItemIndex: number | null;
    updateActiveItemIndex: (idx: number | null) => void;
}>();


const computedPage = computed(() => Number(useRoute().query[routeQueryPage]) ?? 1);
const page = ref(computedPage.value);


const faqPageHandler = (page: number) => {

    navigateTo(`/customer/qna/?${routeQueryPage}=${page}`);
}


const onClickItem = (idx: number) => {
    const { activeItemIndex, updateActiveItemIndex } = props;

    if (activeItemIndex === idx) updateActiveItemIndex(null);
    else updateActiveItemIndex(idx);
}


const answerCkText = computed(() => {
    return (ck: boolean) => {
        return ck ? '답변완료' : '답변 대기중'
    }
})
const createdAtText = computed(() => {
    return (createdAt: string) => {
        return Date.parseUtcToLocal(createdAt).format('yyyy-MM-dd HH:mm')
    }
})


</script>