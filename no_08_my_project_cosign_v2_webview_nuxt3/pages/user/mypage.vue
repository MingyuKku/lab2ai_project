<template>
    <div class="mypage min-h-viewScreen bg-bg-white">
        <!-- <CommonHeadersAppHeader>
            <template #left>
                <div class="flex items-center">
                    <CommonHeadersBackHeaderIcon />
                    <h1 class="text-h2 ml-1">내 계정 관리</h1>
                </div>
            </template>
        </CommonHeadersAppHeader> -->
        <section>
            <UserMypageTab :isEmailRegistered="isEmailRegistered" />
            <NuxtPage
                :mypage="mypage"
                :eventCk="eventCk"
                :isEmailRegistered="isEmailRegistered"
                :isPasswordExist="isPasswordExist"
                :updateEventCk="updateEventCk"
            />
        </section>
    </div>
</template>

<script lang="ts" setup>
import { useMypageValues } from '~/composables/user/mypage/business/useMypageValues';
import { useFetchUserInfoUpdate } from '~/composables/user/mypage/service/useFetchUserInfoUpdate';


const {
    mypage, eventCk, isEmailRegistered, isPasswordExist,
    initMypageValues, updateEventCk
} = useMypageValues();

const { getUserInfo } = useFetchUserInfoUpdate({});

const res = await getUserInfo();
initMypageValues(res);


</script>