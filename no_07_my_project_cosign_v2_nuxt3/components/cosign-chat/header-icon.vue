<template>
    <div class="header-icon">
        <div
            v-if="menuFlag"
            @click="onClickModal"
            class="modal fixed w-full h-viewScreen top-0 left-0"
        ></div>
        <div class="relative">
            <IconObjectMore @click="onClickIcon" class="cursor-pointer" />
            <div
                v-if="menuFlag"
                class="menu absolute top-[calc(100%+6px)] right-0 text-body-3 rounded-lg overflow-hidden shadow-02"
            >
                <NuxtLink
                    :to="isUserSignedIn ? '/user/mypage/update' : undefined"
                    @click="onClickNickname"
                    class="flex items-center bg-bg-white whitespace-nowrap h-12 px-3 border-b border-bg-gray-01"
                >닉네임 변경</NuxtLink>
                <div
                    @click="onClickChatPolicy"
                    class="flex items-center bg-bg-white cursor-pointer whitespace-nowrap h-12 px-3"
                >코싸인챗 정책</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { piniaPopup } from '~/pinia/popup/piniaPopup';
import { piniaAlert } from '~/pinia/popup/piniaAlert';
import { piniaAuthInfoValues } from '~/pinia/user/piniaAuthInfoValues';

const { updateFlag } = defineProps<{
    updateFlag: (value: boolean) => void;
}>();


const { isUserSignedIn } = piniaAuthInfoValues();
const { togglePopupFlag } = piniaPopup();
const { setAlertValue, hiddenAlert } = piniaAlert();
const menuFlag = ref(false);

const onClickIcon = () => {
    menuFlag.value = !menuFlag.value;
}

const onClickModal = () => {
    menuFlag.value = false;
}

const onClickChatPolicy = () => {
    menuFlag.value = false;
    togglePopupFlag(true);
    updateFlag(true);
}

const onClickNickname = () => {
    menuFlag.value = false;
    if (isUserSignedIn) return;

    togglePopupFlag(true);
    setAlertValue({
        description: `로그인 하신 후 이용하실 수 있습니다.`,
        buttons: {
            left: {
                type: 'CANCLE',
                label: '취소하기',
                onClick: () => {
                    togglePopupFlag(false);
                    hiddenAlert();
                }
            },
            right: {
                type: 'OK',
                label: '로그인하기',
                onClick: async () => {
                    navigateTo('/user/sign-in');
                }
            }
        }
    })
}

</script>