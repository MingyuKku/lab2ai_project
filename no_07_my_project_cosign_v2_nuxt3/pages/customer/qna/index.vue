<template>
    <div class="customer-qna">
        <div class="p-primary">
            <div
                @click="onClickQnaRegistButton"
                class="qna-register-button d-button-st h-[50px] rounded bg-bg-black"
            >
                <span class="w-5 mr-1.5"><IconObjectPen fill="white" /></span>
                <span class="text-body-3">1:1 문의 작성하기</span>
            </div>
        </div>
        <CustomerQnaList
            v-if="isUserSignedIn"
            :data="data"
            :activeItemIndex="activeItemIndex"
            :updateActiveItemIndex="updateActiveItemIndex"
        />
    </div>
</template>

<script lang="ts" setup>
import { CUSTOMER_MY_QNA } from '~/composables/_app/asyncDataFetchKeys';
import { useFetchQna } from '~/composables/customer/service/useFetchQna';
import type { MypageUserInfo } from '~/composables/user/mypage/service/_types';
import { useFetchUserInfoUpdate } from '~/composables/user/mypage/service/useFetchUserInfoUpdate';
import { piniaAlert } from '~/pinia/popup/piniaAlert';
import { piniaPopup } from '~/pinia/popup/piniaPopup';
import { piniaAuthInfoValues } from '~/pinia/user/piniaAuthInfoValues';

definePageMeta({
    middleware: 'customer-page'
})



const { isUserSignedIn } = piniaAuthInfoValues();
const { togglePopupFlag } = piniaPopup();
const { setAlertValue } = piniaAlert();

const { getUserInfo } = useFetchUserInfoUpdate({});

const userInfo = ref<MypageUserInfo | null>(null);

if (isUserSignedIn) {
    userInfo.value = await getUserInfo();
}


const onClickQnaRegistButton = () => {
    if (!isUserSignedIn) return notSigninRedirectSigninPage();
    if (!userInfo.value) return;

    if (userInfo.value.email) {
        navigateTo(`/qna-regist`);
    }

    if (!userInfo.value.email) {
        popupAlertNoneEmail();
    }
}


const notSigninRedirectSigninPage = () => {
    navigateTo(`/user/sign-in`);
}



const activeItemIndex = ref<number | null>(null);
const updateActiveItemIndex = (idx: number | null) => {
    activeItemIndex.value = idx;
}


const { getMyQna } = useFetchQna();
const {
    data
} = await useAsyncData(CUSTOMER_MY_QNA, () => getMyQna(CUSTOMER_MY_QNA));




const popupAlertNoneEmail = () => {
    togglePopupFlag(true);
    setAlertValue({
        description: [
            '이메일이 등록되어 있어야 답변을 받을 수 있습니다.',
            '이메일을 먼저 등록해 주시기 바랍니다.'
        ],
        buttons: {
            left: {
                label: '확인',
                type: 'OK',
                onClick: () => {
                    navigateTo(`/user/mypage/update`);
                }
            },
            right: {
                label: '취소',
                type: 'CANCLE',
                onClick: () => {
                    navigateTo(`/customer/faq`);
                }
            }
        }
    })
}

</script>