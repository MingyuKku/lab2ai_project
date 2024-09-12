<template>
    <div class="sign-wait mt-space-between-y-md">
        <div class="card-content bg-bg-gray-04 rounded-xl">
            <div class="above relative w-full flex items-center">
                <div class="start-price flex-1 px-[22px] pt-primary pb-3 text-right">
                    <h2 class="text-body-1 text-font-black">진입가</h2>
                    <HomePartsCardItemPrice
                        :questionCondition="isSignBlur(item.pay, item.ticket)"
                        :questionCount="item.questionCount"
                        :tradeExchangeType="item.tradeExchangeType"
                        :price="item.startPriceFormat"
                    />
                </div>
                <div class="target-price flex-1 px-[22px] pt-primary pb-3 text-start">
                    <h2 class="text-body-1 text-font-black">목표가</h2>
                    <HomePartsCardItemPrice
                        :questionCondition="isSignBlur(item.pay, item.ticket)"
                        :questionCount="item.questionCount"
                        :tradeExchangeType="item.tradeExchangeType"
                        :price="item.targetPriceFormat"
                        :price-color-bind="{
                            'text-position-long': item.positionType !== 'SHORT',
                            'text-position-short': item.positionType === 'SHORT'
                        }"
                    />
                </div>
                <div class="center absolute h-full x-center">
                    <div class="stick w-1 h-full bg-white"></div>
                    <div class="arrow-circle absolute xy-center w-[30px] h-[30px] flex items-center justify-center bg-bg-white rounded-full">
                        <IconObjectLock 
                            v-if="isSignBlur(item.pay, item.ticket, item.simpleStatusType)"
                            :fill="'#000000'" class="w-[24px] h-[24px]"
                            />
                        <IconArrowThick 
                            v-else
                            :fill="item.positionType !== 'SHORT'? '#2BCB8C' : '#F3475D'"
                            />
                    </div>
                </div>
            </div>
            <div class="delow flex justify-center pb-primary">
                <div class="button-wrap w-[220px] h-11 bg-profit-green-gra rounded-full flex items-center justify-center text-font-white">
                    <p class="text-body-2 mr-2">목표 수익률</p>
                    <CommonPartsEarningRate
                        :earning="item.targetEarningRate"
                        :size="17"
                    />
                    <IconDirectionMd class="ml-1" />
                </div>
            </div>
        </div>
        <HomeCardItemModel
            :item="item"
            class="mt-space-between-y-sm"
            :imageBase="imageBase"
        />
    </div>
</template>

<script lang="ts" setup>
import { isSignBlur } from '~/composables/home/business/_methods';
import type { ClassHomeSignItem } from '~/composables/home/service/_types';


defineProps<{
    item: ClassHomeSignItem;
    imageBase: string;
}>();

</script>