<template>
    <div class="customer-page pt-app-header min-h-viewScreen bg-bg-white">
        <CommonHeadersAppHeader>
            <template #left>
                <div class="flex items-center">
                    <CommonHeadersBackHeaderIcon />
                    <h1 class="text-h2 ml-1">고객센터</h1>
                </div>
            </template>
        </CommonHeadersAppHeader>
        <CustomerNav />
        <NuxtPage />
    </div>
</template>

<script lang="ts" setup>

const { name, fullPath } = useRoute();

// 고객센터 라우트 path 'ko/customer'로 접근시 디폴트로 'faq'로 리다이렉트 시킴
if (name === 'customer') navigateTo(`${fullPath}/faq`);

</script>