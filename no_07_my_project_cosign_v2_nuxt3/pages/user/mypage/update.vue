<template>
    <div class="px-primary py-6">
        <CommonPartsFormInputBox
            :id="mypage.nickname.id"
            type="text"
            :value="mypage.nickname.value"
            :setValue="mypage.nickname.setValue"
            :label="mypage.nickname.label"
            :tips="mypage.nickname.tips"
            :errors="mypage.nickname.errors"
            autocomplete="off"
            :placeholder="mypage.nickname.placeholder"
        />
        <CommonPartsFormInputBox
            :id="mypage.email.id"
            type="email"
            :value="mypage.email.value"
            :setValue="mypage.email.setValue"
            :label="mypage.email.label"
            :errors="mypage.email.errors"
            autocomplete="off"
            :disabled="mypage.email.disabled"
            :placeholder="mypage.email.disabled ? undefined : mypage.email.placeholder"
            class="mt-7"
        />
        <UserMypageEventCk
            :eventCk="eventCk"
            :updateEventCk="updateEventCk"
            class="mt-3"
        />
        <button
            type="button"
            @click="submitUpdate"
            class="d-button-st w-full h-[50px] mt-5 rounded"
            :disabled="!checkValuesEmpty"
            :class="checkValuesEmpty ? 'bg-system-mint text-font-white' : 'bg-bg-gray-02 text-bg-dark-03'"
        >
            변경하기
        </button>
        <div class="text-cap-1r text-font-dark-02 underline flex mt-4">
            <NuxtLink to="/user/withdrawal" class="ml-auto">회원탈퇴</NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { MypageInputs } from '~/composables/user/mypage/business/_types';
import { useValidate } from '~/composables/user/sign-up/business/useValidate';
import { useFetchUserInfoUpdate } from '~/composables/user/mypage/service/useFetchUserInfoUpdate';
import { useOptionalCheck } from '~/composables/user/mypage/business/useOptionalCheck';
import { piniaAlert } from '~/pinia/popup/piniaAlert';
import { piniaPopup } from '~/pinia/popup/piniaPopup';
import { MENU_USER_INFO } from '~/composables/_app/asyncDataFetchKeys';

definePageMeta({
    middleware: 'auth',
})

const props = defineProps<{
    mypage: MypageInputs;
    eventCk: boolean;
    isEmailRegistered: boolean;
    updateEventCk: (value: boolean) => void;
}>();


const {
    checkEmailRegisteredAndCreateOptionalEmailErrors,
    checkEmailRegisteredAndOptionalUserInfoUpdateFetchParams
} = useOptionalCheck({
    isEmailRegistered: props.isEmailRegistered,
    mypage: props.mypage
})


const { checkNicknameRule, checkEmailRule } = useValidate({
    nicknameErrors: props.mypage.nickname.errors,
    ...checkEmailRegisteredAndCreateOptionalEmailErrors()
})


const checkValuesEmpty = computed(() => {
    if (props.mypage.nickname.value.length < 1) return false;
    return true;
})


const { updateNickname } = useFetchUserInfoUpdate({
    nicknameErrors: props.mypage.nickname.errors,
    ...checkEmailRegisteredAndCreateOptionalEmailErrors()
});


const submitUpdate = async () => {
    const { mypage, isEmailRegistered, eventCk } = props;

    if (!checkNicknameRule(mypage.nickname.value)) return;
    if (!checkEmailRule(mypage.email.value) && !isEmailRegistered) return;

    const params = {
        ...checkEmailRegisteredAndOptionalUserInfoUpdateFetchParams(),
        nickname: mypage.nickname.value,
        eventCk: eventCk,
    }
    
    const { message } = await updateNickname(params);

    if (message === 'success') {
        const { togglePopupFlag } = piniaPopup();
        const { setAlertValue } = piniaAlert();

        togglePopupFlag(true);
        setAlertValue({
            description: '회원 정보가 변경되었습니다.',
            buttons: {
                center: {
                    type: 'OK',
                    label: '확인',
                    onClick: () => {
                        clearNuxtData(MENU_USER_INFO);
                        navigateTo(`/menu`);
                    }
                }
            }
        })
        
    } else {
        alert(`서버 점검 중입니다. 잠시 후 다시시도해주세요.`)
    }
}

</script>