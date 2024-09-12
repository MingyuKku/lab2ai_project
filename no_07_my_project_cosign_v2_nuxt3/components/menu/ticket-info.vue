<template>
    <div class="user-ticket-infomation mt-[15px]">
        <div v-if="user && user.passType" class="ticket-wrap bg-bg-gray-04 py-[15px] px-3 rounded">
            <h3 class="text-body-3 text-system-mint mb-[15px]">{{ user.ticketDisplayKoName }}</h3>
            <div v-if="user.passType === 'SUBSCRIPTIONS'" class="text-body-5 flex items-center justify-between">
                <div>다음 결제일</div>
                <div>{{ nextPurchaseDateTimeComputed }}</div>
            </div>
            <div v-if="user.passType === 'ONE_TIME_PURCHASE'" class="text-body-5 flex items-center justify-between">
                <div>남은 기간</div>
                <div v-if="user.remainingDateTime && user.remainingDateTime >= 1">{{ user.remainingDateTime }}</div>
                <div>오늘 만료</div>
            </div>
        </div>
        <div v-else class="no-ticket-wrap bg-bg-gray-04 py-[15px] px-3 rounded">
            <p class="text-cap-1r mb-[15px]">코싸인이 제공하는 모든 SIGN을 확인해 보세요.</p>
            <NuxtLink to="/ticket" class="d-button-st bg-system-mint h-9 rounded">
                <span class="text-body-3 text-font-white">AI SIGN 구독하기</span>
            </NuxtLink>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { useInstance } from '~/composables/_api/useInstance';
import type { UserInfo } from '~/composables/menu/service/_types';


const { user } = defineProps<{
    user: UserInfo | null;
}>();

// const user: UserInfo = {
// "username":"test@cosign.cc",
// "nickname":"iostest",
// "passStatusType":"ACTIVE",
// "ticketDisplayKoName":"프리미엄 SIGN 구독권",
// "passType":"SUBSCRIPTIONS",
// "passPlatformType":null,
// "nextPurchaseDateTime":"2024-07-02T02:13:30",
// "remainingDateTime":7
// }


const nextPurchaseDateTimeComputed = computed(() => user?.nextPurchaseDateTime ? Date.parseUtcToLocal(user.nextPurchaseDateTime).format('yyyy년 MM월 dd일') : '');

// const { params } = useRoute();
// const { locale } = params;

// const { dateTimeFormat } = useInstance();

// const dateFormat = dateTimeFormat(locale as string, {
//     year: 'numeric',
//     month: 'long',
//     day: '2-digit',
//     weekday: 'short',
// });



</script>