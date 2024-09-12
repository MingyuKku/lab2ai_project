<template>
    <div class="customer-faq-paginate-page">
        <section class="head py-primary">
            <CustomerFaqSearchBar />
            <CustomerFaqCategoryList
                class="mt-4"
            />
        </section>
        <CustomerFaqList
            :data="data"
            :activeItemIndex="activeItemIndex"
            :updateActiveItemIndex="updateActiveItemIndex"
        />
    </div>
</template>

<script lang="ts" setup>
import { CUSTOMER_FAQ_LATEST_LIST } from '~/composables/_app/asyncDataFetchKeys';
import { useFetchFaq } from '~/composables/customer/service/useFetchFaq';

definePageMeta({
    middleware: 'customer-faq',
})


const { getFaqList } = useFetchFaq();

const {
    data,
    refresh
} = await useAsyncData(
    CUSTOMER_FAQ_LATEST_LIST, () => getFaqList(CUSTOMER_FAQ_LATEST_LIST))


const activeItemIndex = ref<number | null>(null);
const updateActiveItemIndex = (idx: number | null) => {
    activeItemIndex.value = idx;
}



// 라우터 쿼리 page, category의 변화를 감지
watch(() => useRoute().query, (newVal) => {
    // console.log('안대', newVal, searchKeyword.value)
    updateRefresh();
})

const updateRefresh = () => {
    updateActiveItemIndex(null);
    clearNuxtData(CUSTOMER_FAQ_LATEST_LIST);
    refresh();
}


</script>