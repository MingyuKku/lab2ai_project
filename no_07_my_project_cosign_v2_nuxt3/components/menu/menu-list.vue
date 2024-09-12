<template>
    <div class="menu-list">
        <ul>
            <li
                v-for="item,idx in menuList" :key="idx"
            >
                <NuxtLink
                    v-if="item.href"
                    :to="item.href"
                    class="flex items-center justify-between p-primary"
                >
                    <h1>{{ item.label }}</h1>
                    <IconDirectionMd fill="#929AA5" />
                </NuxtLink>
                <!-- <div
                    v-if="item.onClick"
                    @click="item.onClick()"
                    class="flex items-center justify-between p-primary cursor-pointer"
                >
                    <h1>{{ item.label }}</h1>
                    <IconDirectionMd fill="#929AA5" />
                </div> -->
            </li>
        </ul>
        <div v-if="piniaAuthInfoValues().isUserSignedIn" class="px-primary py-2.5">
            <button @click="onClickSignout" class="text-[12px] text-[#9B9B9B] underline">로그아웃</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useFetchSignout } from '~/composables/user/sign-out/service/useFetchSignout';
import { useMenuList } from '~/composables/menu/business/useMenuList';
import { piniaAuthInfoValues } from '~/pinia/user/piniaAuthInfoValues';

const { menuList } = useMenuList();

const onClickSignout = () => {
    const { signout } = useFetchSignout();
    
    signout();
}

</script>