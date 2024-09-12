<template>
    <div class="customer-notice">
        <CustomerNoticeItemList
            :items="data"
        />
    </div>
</template>

<script lang="ts" setup>
import { CUSTOMER_NOTICE_LIST } from '~/composables/_app/asyncDataFetchKeys';
import { useFetchNotice } from '~/composables/customer/service/useFetchNotice';

definePageMeta({
    middleware: 'customer-page',
})


const { getNoticeList } = useFetchNotice();
const {
    data,
    refresh,
} = await useAsyncData(CUSTOMER_NOTICE_LIST, () => getNoticeList(CUSTOMER_NOTICE_LIST))


// 라우터 쿼리 page의 변화를 감지
watch(() => useRoute().query, (newVal) => {
    // console.log('안대', newVal, searchKeyword.value)
    clearNuxtData(CUSTOMER_NOTICE_LIST);
    refresh();
})


</script>