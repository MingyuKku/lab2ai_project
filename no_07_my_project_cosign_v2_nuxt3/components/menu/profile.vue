<template>
    <div class="menu-profile">
        <!-- :to="isLoginState.isLogin ? '/user/mypage/update' : '/user/signIn'" -->
        <NuxtLink
            :to="user ? `/user/mypage/update` : `/user/sign-in`"
            class="cont-inner flex items-center justify-between cursor-pointer">
            <div class="left-content">
                <div class="unauthenticated-user flex items-center">
                    <IconObjectUser />
                    <p v-if="user" class="text-body-1 ml-2.5">{{ user.nickname }}</p>
                    <p v-else class="text-body-1 ml-2.5">로그인 후 이용해 주세요</p>
                </div>
            </div>
            <div class="right"><IconDirectionMd fill="#000" /></div>
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
import type { UserInfo } from '~/composables/menu/service/_types';


defineProps<{
    user: UserInfo | null;
}>();



</script>