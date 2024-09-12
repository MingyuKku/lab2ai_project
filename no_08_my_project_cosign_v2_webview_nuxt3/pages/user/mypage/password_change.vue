<template>
    <div class="px-primary py-6">
        <form method="post">
            <CommonPartsFormInputBox
                v-if="isPasswordExist"
                :id="mypage.oldPassword.id"
                type="password"
                :value="mypage.oldPassword.value"
                :setValue="mypage.oldPassword.setValue"
                :label="mypage.oldPassword.label"
                :tips="mypage.oldPassword.tips"
                :errors="mypage.oldPassword.errors"
                autocomplete="off"
                :placeholder="mypage.oldPassword.placeholder"
                class="mb-7"
            />
            <CommonPartsFormInputBox
                :id="mypage.newPassword.id"
                type="password"
                :value="mypage.newPassword.value"
                :setValue="mypage.newPassword.setValue"
                :label="mypage.newPassword.label"
                :tips="mypage.newPassword.tips"
                :errors="mypage.newPassword.errors"
                autocomplete="off"
                :placeholder="mypage.newPassword.placeholder"
            />
            <CommonPartsFormInputBox
                :id="mypage.newPasswordCheck.id"
                type="password"
                :value="mypage.newPasswordCheck.value"
                :setValue="mypage.newPasswordCheck.setValue"
                :label="mypage.newPasswordCheck.label"
                :tips="mypage.newPasswordCheck.tips"
                :errors="mypage.newPasswordCheck.errors"
                autocomplete="off"
                :placeholder="mypage.newPasswordCheck.placeholder"
                class="mt-7"
            />
        </form>
        
        <button
            type="button"
            @click="submitUpdate"
            class="d-button-st w-full h-[50px] mt-5 rounded"
            :disabled="!checkValuesEmpty"
            :class="checkValuesEmpty ? 'bg-system-mint text-font-white' : 'bg-bg-gray-02 text-bg-dark-03'"
        >
            변경하기
        </button>
    </div>
</template>

<script lang="ts" setup>
import { messageWebview } from '~/composables/_app/useFlutterWebview';
import type { MypageInputs } from '~/composables/user/mypage/business/_types';
import { useFetchPasswordUpdate } from '~/composables/user/mypage/service/useFetchPasswordUpdate';
import { useValidate } from '~/composables/user/sign-up/business/useValidate';
import { piniaAlert } from '~/pinia/popup/piniaAlert';
import { piniaPopup } from '~/pinia/popup/piniaPopup';


definePageMeta({
    middleware: 'auth',
})

const props = defineProps<{
    mypage: MypageInputs;
    eventCk: boolean;
    isEmailRegistered: boolean;
    isPasswordExist: boolean;
    updateEventCk: (value: boolean) => void;
}>();


const { checkPasswordRule, checkPasswordCheckRule } = useValidate({
    passwordErrors: props.mypage.newPassword.errors,
    passwordCheckErrors: props.mypage.newPasswordCheck.errors,
})


const checkValuesEmpty = computed(() => {
    if (props.mypage.newPassword.value.length < 1) return false;
    if (props.mypage.newPasswordCheck.value.length < 1) return false;
    return true;
})


const { addSnsPassword, updatePassword } = useFetchPasswordUpdate({
    passwordErrors: props.mypage.newPassword.errors,
    oldPasswordErrors: props.mypage.oldPassword.errors,
});


const submitUpdate = async () => {
    const { mypage } = props;

    if (!checkPasswordRule(mypage.newPassword.value)) return;
    if (!checkPasswordCheckRule(mypage.newPassword.value, mypage.newPasswordCheck.value)) return;


    if (props.isPasswordExist) { // 기존 코싸인 회원 => 비밀번호 변경
        
        const { message } = await updatePassword({
            oldPwd: mypage.oldPassword.value,
            newPwd: mypage.newPassword.value
        });

        if (message === 'success') {
            messageWebview('dialog_success_change_password');
            // successPopup();
        }
    }

    if (!props.isEmailRegistered) { // sns 회원가입 회원 => 비밀번호 추가
        const { message } = await addSnsPassword(mypage.newPassword.value);

        if (message === 'success') {
            messageWebview('dialog_success_change_password');
            // successPopup();
        }
    }
    

    function successPopup() {
        const { togglePopupFlag } = piniaPopup();
        const { setAlertValue } = piniaAlert();

        togglePopupFlag(true);
        setAlertValue({
            description: '비밀번호가 성공적으로 변경되었습니다.',
            buttons: {
                center: {
                    type: 'OK',
                    label: '확인',
                    onClick: () => {
                        navigateTo(`/menu`);
                    }
                }
            }
        })
    }
}


</script>