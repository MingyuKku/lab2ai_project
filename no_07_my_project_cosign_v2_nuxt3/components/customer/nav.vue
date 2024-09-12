<template>
    <div class="customer-nav sticky top-app-header left-0 flex items-center bg-bg-white border-b-2 border-border-gray-05">
        <div
            v-for="item,idx in navList" :key="idx"
            @click="onClickNav(idx)"
            class="flex-1 relative"
        >
            <NuxtLink
                :to="item.href"
                :replace="true"
                class="flex items-center justify-center h-10"
                :class="activeIndex === idx ? 'text-body-3 text-system-mint' : 'text-body-3r text-font-dark-02'"
            >
                {{ item.label }}
            </NuxtLink>
            <span v-if="activeIndex === idx" class="active-bar absolute bottom-0 w-full h-0.5 bg-system-mint"></span>
        </div>
    </div>
</template>

<script lang="ts" setup>


const { name } = useRoute();

const navList = [
    {
        label: '자주 묻는 질문',
        href: `/customer/faq`,
        name: 'customer-faq',
    },
    {
        label: '1:1 문의',
        href: `/customer/qna`,
        name: 'customer-qna',
    },
    {
        label: '공지사항',
        href: `/customer/notice`,
        name: 'customer-notice',
    },
]

const initActiveNavIndex = computed(() => navList.findIndex(item => (name as string).includes(item.name)))

const activeIndex = ref(initActiveNavIndex.value);

const onClickNav = (idx: number) => {
    activeIndex.value = idx;
}

</script>