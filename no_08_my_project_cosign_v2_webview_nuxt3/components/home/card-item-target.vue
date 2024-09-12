<template>
    <div class="sign-target mt-space-top-lg">
        <div>
            <HomePartsCardItemProgress
                :item="item"
            />
            <div class="target-text-content-info flex mt-space-between-y-ssm">
                <div class="target-1 flex-1">
                    <h2
                        :class="
                            isSuccessTarget1()
                            ? isSuccessTarget2()
                            ? 'text-h5 text-font-black'
                            : 'text-h3 text-font-black'
                            : 'text-body-2 text-font-dark-03 leading-[1.4]'"
                    >목표가 1</h2>
                    <HomePartsCardItemEarning v-if="isWaitTarget2()" :earning="item.targetEarningRate" class="mt-space-between-y-ssm" />
                </div>
                <div class="target-2 flex-1 text-center">
                    <h2
                        :class="
                            isSuccessTarget2()
                            ? 'text-h3 text-font-black'
                            : 'text-body-2 text-font-dark-03'"
                        >목표가 2</h2>
                    <HomePartsCardItemEarning v-if="isWaitTarget3()" :earning="item.targetEarningRate" class="mt-space-between-y-ssm justify-center" />
                </div>
                <div class="target-3 flex-1 text-right">
                    <h2 class="text-body-2 text-font-dark-03 leading-[1.4]">목표가 3</h2>
                </div>
            </div>
        </div>
        <HomeCardItemModel
            :item="item"
            class="mt-space-top-lg"
            :imageBase="imageBase"
        />
    </div>
</template>

<script lang="ts" setup>
import type { ClassHomeSignItem } from '~/composables/home/service/_types';
import { useFuctions } from '~/composables/home/business/useFuctions';
import { useSignOnState } from '~/composables/sign-detail/business/useSignOnState';

const { item } = defineProps<{
    item: ClassHomeSignItem;
    imageBase: string;
}>();

const { isWaitTarget2, isWaitTarget3 } = useFuctions(item.evaluateState);
const { isSuccessTarget1, isSuccessTarget2 } = useSignOnState({
    evaluateState: item.evaluateState
})

</script>