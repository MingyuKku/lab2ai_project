<template>
    <div
        class="search-bar-wrap fixed top-0 flex items-center pt-primary"
        :class="!isMobile ? 'w-desktop' : 'w-full left-0'"
    >
        <div class="search-bar w-full h-10 flex items-center bg-bg-gray-03 rounded-[3px] px-3">
            <IconObjectMagnifier fill="#9B9B9B" class="mr-2.5"/>
            <input
                ref="searchInputRef" 
                class="input-default-st h-full bg-transparent border-none p-0" 
                type="text" 
                :placeholder="placeholder"
                :value="keyword" 
                @keyup="onKeyup"
            >
        </div>
        <div class="close py-2.5 pl-primary cursor-pointer" @click="$router.back()">
            <span class="text-cap-1r whitespace-nowrap">닫기</span>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { useSearchCrypto } from '~/composables/search/business/useSearchCrypto';
import type { ClassSearchItem } from '~/composables/search/services/_types';

const { isMobile } = useDevice();

const { setKeyword, updateSearchResultList } = defineProps<{
    keyword: string;
    setKeyword: (key: string) => void;
    updateSearchResultList: (list: ClassSearchItem[]) => void;
    placeholder?: string;
}>();

const searchInputRef = ref<HTMLInputElement | null>(null);


function onKeyup(e:Event) {
    const target = e.target as HTMLInputElement;
    setKeyword(target.value);
    useSearchCrypto(target.value, updateSearchResultList);
}


onMounted(() => {
    nextTick(() => {
        if (searchInputRef.value) searchInputRef.value.focus();
    })
})

</script>
