<template>
    <div class="menu-page pt-app-header">
        <CommonHeadersAppHeader>
            <template #left>
                <!-- <h1 v-if="isMobile" class="text-h1">메뉴</h1> -->
                <IconBrandCosignFull />
            </template>
            <template #right>
                <CommonHeadersBasicMenu />
            </template>
        </CommonHeadersAppHeader>
        <section class="profile-info px-primary py-[15px] bg-bg-white">
            <MenuProfile :user="user" />
            <MenuTicketInfo :user="user" />
        </section>
        <section class="bg-bg-white mt-2">
            <MenuList />
        </section>
        <section class="bg-bg-white mt-2">
            <MenuAppDownload />
        </section>
        <section class="bg-bg-white mt-2">
            <MenuFamilySites />
        </section>
        <CommonFooterFooter class="mt-2 pb-[60px]" />
    </div>
</template>

<script lang="ts" setup>
import { MENU_USER_INFO } from '~/composables/_app/asyncDataFetchKeys';
import { useFetchUserTicket } from '~/composables/menu/service/useFetchUserTicket';

const { isMobile } = useDevice();
const { getUserTicket } = useFetchUserTicket();

const {
    data: user
} = await useAsyncData(MENU_USER_INFO, () => getUserTicket(MENU_USER_INFO))

// console.log('유저!', user.value)



</script>