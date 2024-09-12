<template>
    <div class="search-page bg-bg-white min-h-viewScreen pt-16 pb-space-page-bottom">
        <CommonHeadersSearchBar
            :keyword="keyword"
            :setKeyword="setKeyword"
            :updateSearchResultList="updateSearchResultList"
            placeholder="코인 검색"
            class="px-primary bg-bg-white"
        />
        <SearchRecentSearchList
            v-if="!keyword"
            :imageBase="imageBase"
        />
        <SearchResultList
            :items="searchResultList"
            :imageBase="imageBase"
        />
        <CommonAd
            v-show="!keyword"
            class="my-space25 min-h-[100px]"
            :adsense="{
                slot: '1380628379',
                widthResponsive: true,
                style: {
                    'display': 'block',
                    'height': '100px'
                }
            }"
            :adfit="{
                src: '//t1.daumcdn.net/kas/static/ba.min.js',
                unit: 'DAN-83Frp1FFo9yA6W0G',
                width: '320',
                height: '100',
            }"
        />
        <SearchRecommendList v-show="!keyword" />
    </div>
</template>

<script lang="ts" setup>
import { useFetchSearch } from '~~/composables/search/services/useFetchSearch';

const config = useRuntimeConfig();
const imageBase = config.public.IMAGE_URL;

const { searchResultList, updateSearchResultList } = await useFetchSearch();

const keyword = ref<string>('');

const setKeyword = (key: string) => {
    keyword.value = key;
}


</script>