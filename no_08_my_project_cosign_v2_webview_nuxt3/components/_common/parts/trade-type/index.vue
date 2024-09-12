<template>
    <p
        class="inline-block box-ssm6 text-cap-1r leading-none" 
        :class="tradeType === 'FUTURES' ? 'text-position-long bg-bg-green' : 'text-font-dark-01 bg-bg-gray-03'"
    >
        {{ tradeType === 'SPOT' ? '현물' : '선물' }}
    </p>
</template>


<script lang="ts" setup>
import type { TradeType } from '~/composables/home/service/_types';


defineProps<{
    tradeType?: TradeType;
}>();

</script>