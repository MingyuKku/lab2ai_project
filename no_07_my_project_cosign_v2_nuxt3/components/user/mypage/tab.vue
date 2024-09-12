<template>
    <div class="user-mypage-nav flex items-center h-[42px] text-center border-b-[1.5px] border-border-gray-04">
        <div class="relative flex-1 h-full">
            <NuxtLink
                to="/user/mypage/update"
                :replace="true"
                class="flex items-center justify-center h-full "
                :class="$route.name === 'user-mypage-update' ? 'text-body-3 text-system-mint' : 'text-body-3r text-font-dark-02'"
            >
                개인정보 수정
            </NuxtLink>
            <span v-if="$route.name === 'user-mypage-update'" class="active-bar absolute bottom-0 block w-full h-0.5 bg-system-mint"></span>
        </div>
        <div class="relative flex-1 h-full">
            <NuxtLink
                :to="isEmailRegistered ? `/user/mypage/password_change` : undefined"
                :replace="true"
                @click="!isEmailRegistered ? onClickBlocked() : undefined"
                class="flex items-center justify-center h-full cursor-pointer"
                :class="$route.name === 'user-mypage-password_change' ? 'text-body-3 text-system-mint' : 'text-body-3r text-font-dark-02'"
            >
                비밀번호 변경
            </NuxtLink>
            <span v-if="$route.name === 'user-mypage-password_change'" class="active-bar absolute bottom-0 block w-full h-0.5 bg-system-mint"></span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { piniaAlert } from '~/pinia/popup/piniaAlert';
import { piniaPopup } from '~/pinia/popup/piniaPopup';


defineProps<{
    isEmailRegistered: boolean;
}>();



const onClickBlocked = () => {
    const { togglePopupFlag } = piniaPopup();
    const { setAlertValue, hiddenAlert } = piniaAlert();
    const { params } = useRoute();

    togglePopupFlag(true);
    setAlertValue({
        description: [
            '이메일 아이디가 입력되어야 비밀번호 설정하실 수 있습니다.',
            '지금 이메일을 등록하시겠습니까?'
        ],
        buttons: {
            left: {
                type: 'OK',
                label: '예',
                onClick: () => {
                    togglePopupFlag(false);
                    hiddenAlert();
                }
            },
            right: {
                type: 'CANCLE',
                label: '아니오',
                onClick: () => {
                    navigateTo(`/menu`);
                }
            }
        }
    })
}


</script>