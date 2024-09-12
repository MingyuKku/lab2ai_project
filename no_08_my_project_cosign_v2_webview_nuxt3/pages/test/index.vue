<template>
    <div class="bg-bg-white">
        <h1>테스트 페이지</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <div>
            <div ref="visualWrapTop" class="visual-wrap-top"></div>
            <div ref="wrapDom" class="wrapper">
                <TestItem
                    v-for="(item,idx) in results"
                    :key="idx"
                    :item="item"
                    class="mb-3 last:mb-0"
                />
            </div>
            <div ref="visualWrapBottom" class="visual-wrap-bottom"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useFetchTest, visualScroll } from '~/composables/test/useFetchTest';


const { getRandomData } = useFetchTest();
const key = 'akdkdso'
const {
    data: results,
} = await useAsyncData(key, () => getRandomData());

// console.log('반환', results.value)

const wrapDom = ref<HTMLDivElement | null>(null);
const visualWrapTop = ref<HTMLDivElement | null>(null);
const visualWrapBottom = ref<HTMLDivElement | null>(null);

const {
    createVisualScroll
} = visualScroll();



onMounted(() => {
    createVisualScroll({
        wrapDom: wrapDom.value,
        wrapDomTop: visualWrapTop.value,
        wrapDomBottm: visualWrapBottom.value,
        itemHeight: 232,
        visibleItemCount: 8
    })
})



</script>