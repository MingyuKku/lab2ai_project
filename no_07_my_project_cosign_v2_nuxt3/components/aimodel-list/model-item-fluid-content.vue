<template>
    <div class="model-item-fluid-content pt-space-between-y-ssm border-t-[1px] border-dashed border-border-gray-05">
        <h1 class="text-body-6 text-font-dark-01">{{ contentTitle }}</h1>
        <div class="items flex items-center mt-1.5 overflow-x-auto">
            <div
                v-for="(item,idx) in items"
                :key="idx"
                @click.prevent="onClickItem(item)"
                class="flex items-center border border-border-gray-03 rounded-[8px] p-2 mr-2 last:mr-0"
            >
                <span class="text-body-4 text-font-dark-01 leading-none mr-1">{{ item.digitalAssetsCode }}</span>
                <span class="text-p&l-profit-02 text-price-13m leading-none">{{ item.earningRate.truncateDecimal(100) }}</span>
                <span class="text-p&l-profit-02 text-[10px] ml-0.5 leading-none mt-0.5">%</span>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import type { RecentBestSignItems } from '~/composables/aimodel-detail/service/_types';


const { modelId } = defineProps<{
    contentTitle: string;
    modelId: string;
    items: RecentBestSignItems[];
}>();

const onClickItem = (item: RecentBestSignItems) => {
    navigateTo(`/${modelId}/${item.subSeqId}`);
}

</script>