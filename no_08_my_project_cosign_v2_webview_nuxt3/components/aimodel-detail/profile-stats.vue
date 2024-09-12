<template>
    <div class="aimodel-profile-stats relative flex items-center mt-6">
        <div class="center absolute xy-center"><IconObjectStates /></div>

        <div class="earning flex-1 border-r-[1px] border-border-dark-01">
            <h1 class="text-body-3 text-font-white text-center mb-3">수익 적중률</h1>
            <div class="flex items-center justify-center">
                <div class="mr-2 flex flex-col items-center">
                    <CommonPartsEarningRate
                        :earning="profile.bestSuccessRate?.truncateDecimal(10) ?? 0"
                        :size="17"
                        class="text-font-white w-[60px] text-center"
                    />
                    <p class="text-cap-1r text-font-dark-03 mt-0.5">전체</p>
                </div>
                <div class="flex flex-col items-center">
                    <CommonPartsEarningRate
                        :earning="profile.recentSuccessRate?.truncateDecimal(10) ?? 0"
                        :size="17"
                        class="text-font-white w-[60px] text-center"
                    />
                    <p class="text-cap-1r text-font-dark-03 mt-0.5">10일</p>
                </div>
            </div>
        </div>
        <div class="hit flex-1">
            <h1 class="text-body-3 text-font-white text-center mb-3">최고 수익률</h1>
            <div class="flex items-center justify-center">
                <div class="mr-2 flex flex-col items-center">
                    <CommonPartsEarningRate
                        :earning="profile.bestEarningRate?.truncateDecimal(10) ?? 0"
                        :size="17"
                        class="text-system-mint w-[60px] text-center mr-0.5"
                    />
                    <p class="text-cap-1r text-font-dark-03 mt-0.5">전체</p>
                </div>
                <div class="flex flex-col items-center">
                    <CommonPartsEarningRate
                        :earning="profile.recentEarningRate?.truncateDecimal(10) ?? 0"
                        :size="17"
                        class="text-system-mint w-[60px] text-center mr-0.5"
                    />
                    <p class="text-cap-1r text-font-dark-03 mt-0.5">10일</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ModelProfileDetail } from '~/composables/aimodel-detail/service/_types';


defineProps<{
    profile: ModelProfileDetail;
}>();

</script>