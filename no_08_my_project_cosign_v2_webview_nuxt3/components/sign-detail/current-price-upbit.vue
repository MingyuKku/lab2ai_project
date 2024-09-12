<template>
    <div class="current-price mt-1">
        <div class="price flex items-center text-cap-1r">
            <p class="text-font-dark-01 mr-0.5">현재가</p>
            <div
                v-if="socketMessages[0] && socketMessages[0].tradePrice" class="ml-0.5"
                :class="socketMessages[0].change === 'RISE' ? 'text-position-long' : socketMessages[0].change === 'FALL' ? 'text-position-short' : 'text-font-black'"
            >
                <span>{{ socketMessages[0].tradePrice }}원</span>
            </div>
            <CommonLoadingSpinnerLdsEllipsis v-else class="ml-2" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useUpbitSocket } from '~/composables/home/business/useUpbitSocket';


const { digitalAssetsCode } = defineProps<{
    digitalAssetsCode: string;
}>();


const { connectUpbit, socketMessages } = useUpbitSocket(digitalAssetsCode);

onMounted(() => {
    connectUpbit();
})

</script>