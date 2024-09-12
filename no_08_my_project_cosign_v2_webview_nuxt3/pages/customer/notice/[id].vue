<template>
    <div class="notice-id-detail-page pt-space-top-md pb-[60px]">
        <div v-if="data" class="notice-id-content py-third px-primary">
            <p class="date text-cap-1r text-font-dark-03">{{ createdAtComputed(data.createdAt) }}</p>
            <h1 class="text-h2 mt-1 mb-[30px]">{{ data.title }}</h1>
            <div class="content html-customer-notice-content" v-html="data.content"></div>
        </div>
        <div class="list-btn flex items-center justify-center">
            <div
                @click="onClickList"
                class="w-[106px] h-10 bg-bg-black d-button-st text-[16px] rounded"
            >
                목록
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CUSTOMER_NOTICE_DETAIL } from '~/composables/_app/asyncDataFetchKeys';
import { useFetchNotice } from '~/composables/customer/service/useFetchNotice';


const { params } = useRoute();
const { id } = params;
const { getNoticeDetail } = useFetchNotice();

const dynamicKey = `${CUSTOMER_NOTICE_DETAIL}-${id}`;
const {
    data
} = await useAsyncData(dynamicKey, () => getNoticeDetail(dynamicKey, id as string))


const createdAtComputed = computed(() => {
    return (createdAt: string) => {
        return Date.parseUtcToLocal(createdAt).format('yyyy-MM-dd HH:mm')
    }
})


const onClickList = () => {
    const { go } = useRouter();
    go(-1);
}

</script>