<template>
    <div class="faq-search-bar px-primary">
        <div class="search-bar w-full h-10 flex items-center bg-bg-gray-03 rounded-[3px] px-3">
            <input
                class="input-default-st h-full bg-transparent border-none p-0" 
                type="text" 
                placeholder="궁금한 내용을 검색해보세요."
                :value="inputValue"
                @input="onInput"
                @keyup.enter="onKeyup"
            >
            <div @click="onClickSearch" class="ml-2.5"><IconObjectMagnifier fill="#9B9B9B" /></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { routeQueryCategory, routeQueryKeyword, routeQueryPage } from '~/composables/customer/business/constant';


const inputValue = ref('');

const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    inputValue.value = target.value;
    // props.updateKeyword(target.value);
}

const onKeyup = (e: Event) => {
    updateKeywordRefresh();
}

const onClickSearch = () => {
    updateKeywordRefresh();
}


const updateKeywordRefresh = () => {
    const { query } = useRoute();

    const category = query[routeQueryCategory];
    
    useRouter().replace({
        path: `/customer/faq/`,
        query: {
            [routeQueryPage]: 1, // 페이지 넘버 초기화
            [routeQueryCategory]: category,
            [routeQueryKeyword]: inputValue.value,
        }
    });
}


</script>