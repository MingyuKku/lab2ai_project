<template>
    <div class="progress-label relative">
        <div
            class="text-cap-1b px-1.5 py-2 rounded border-2 whitespace-nowrap bg-bg-white"
            :class="labelClass"
        >{{ label }}</div>
        <div v-if="isPriceLabel" class="absolute flex items-end top-full translate-y-1.5 whitespace-nowrap" :class="target === 'target3' ? 'right-0' : 'x-center'">
            <span class="text-price-15b">{{ price ? numberFormat(price) : '' }}</span>
            <!-- <span class="text-price-15b">{{ price }}</span> -->
            <span class="text-cap-2m ml-0.5">{{ priceTag }}</span>
            <!-- <span v-if="earning" class="ml-1 text-price-14b text-price-profit">({{ earning }}%)</span> -->
            <div v-if="earning" class="flex items-center ml-1 leading-none text-price-profit text-price-14b">(<CommonPartsEarningRate :earning="earning" :size="14" class="leading-none" />)</div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { type SignOnProgressLabelKeyType, type SignOnProgressLabelValueType } from '~/composables/sign-detail/business/_types';
import { useInstance } from '~/composables/_api/useInstance';


defineProps<{
    target: SignOnProgressLabelKeyType;
    label?: SignOnProgressLabelValueType;
    labelClass?: string;
    isPriceLabel: boolean;
    price?: number;
    priceTag?: string;
    earning?: number;
}>();

const { numberFormat } = useInstance();

</script>