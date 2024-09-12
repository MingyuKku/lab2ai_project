<template>
    <div class="sign-up-page pt-app-header min-h-viewScreen bg-bg-white">
        <CommonHeadersAppHeader>
            <template #left>
                <div class="flex items-center">
                    <CommonHeadersBackHeaderIcon />
                    <h1 class="text-h2 ml-1">회원가입</h1>
                </div>
            </template>
        </CommonHeadersAppHeader>
        <form class="form-wrap p-primary" method="post">
            <CommonPartsFormInputBox
                :id="signupInputs.nickname.id"
                type="text"
                :value="signupInputs.nickname.value"
                :setValue="signupInputs.nickname.setValue"
                :label="signupInputs.nickname.label"
                :tips="signupInputs.nickname.tips"
                :errors="signupInputs.nickname.errors"
                autocomplete="off"
                :placeholder="signupInputs.nickname.placeholder"
            />
            <CommonPartsFormInputBox
                :id="signupInputs.email.id"
                type="email"
                :value="signupInputs.email.value"
                :setValue="signupInputs.email.setValue"
                :label="signupInputs.email.label"
                :tips="signupInputs.email.tips"
                :errors="signupInputs.email.errors"
                autocomplete="off"
                :placeholder="signupInputs.email.placeholder"
                class="mt-7"
            />
            <CommonPartsFormInputBox
                :id="signupInputs.password.id"
                type="password"
                :setValue="signupInputs.password.setValue"
                :label="signupInputs.password.label"
                :tips="signupInputs.password.tips"
                :errors="signupInputs.password.errors"
                autocomplete="off"
                :placeholder="signupInputs.password.placeholder"
                class="mt-7"
            />
            <CommonPartsFormInputBox
                :id="signupInputs.passwordCheck.id"
                type="password"
                :setValue="signupInputs.passwordCheck.setValue"
                :label="signupInputs.passwordCheck.label"
                :tips="signupInputs.passwordCheck.tips"
                :errors="signupInputs.passwordCheck.errors"
                autocomplete="off"
                :placeholder="signupInputs.passwordCheck.placeholder"
                class="mt-1.5"
            />
            <UserSignUpAgressList
                :items="signupAgreeList"
                :updateSignupAgreeList="updateSignupAgreeList"
                :toggleSignupAgreeListAllCheck="toggleSignupAgreeListAllCheck"
                class="mt-8"
            />
            <button
                type="button"
                @click="submitSignUp"
                class="d-button-st w-full h-[50px] mt-5 rounded"
                :disabled="!checkValuesEmpty"
                :class="checkValuesEmpty ? 'bg-system-mint text-font-white' : 'bg-bg-gray-02 text-bg-dark-03'"
            >
                회원가입
            </button>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { useSignupData } from '~/composables/user/sign-up/business/useSignupData';
import { useValidate } from '~/composables/user/sign-up/business/useValidate';
import type { SignupParams } from '~/composables/user/sign-up/service/_types';
import { useFetchSignup } from '~/composables/user/sign-up/service/useFetchSignup';
import { piniaAlert } from '~/pinia/popup/piniaAlert';
import { piniaPopup } from '~/pinia/popup/piniaPopup';


const { signupInputs, signupAgreeList, updateSignupAgreeList, toggleSignupAgreeListAllCheck, isAllRequiredChecked } = useSignupData();
const {
    checkNicknameRule,
    checkEmailRule,
    checkPasswordRule,
    checkPasswordCheckRule,
} = useValidate({
    nicknameErrors: signupInputs.nickname.errors,
    emailErrors: signupInputs.email.errors,
    passwordErrors: signupInputs.password.errors,
    passwordCheckErrors: signupInputs.passwordCheck.errors,
});


/**
 * 모든 값이 존재하며 필수 동의에 체크한 경우 true 반환
 */
const checkValuesEmpty = computed(() => {
    if (signupInputs.nickname.value.length < 1) return false;
    if (signupInputs.email.value.length < 1) return false;
    if (signupInputs.password.value.length < 1) return false;
    if (signupInputs.passwordCheck.value.length < 1) return false;

    if (!isAllRequiredChecked()) return false;
    return true;
})


const { signup } = useFetchSignup({
    nicknameErrors: signupInputs.nickname.errors,
    emailErrors: signupInputs.email.errors,
    passwordErrors: signupInputs.password.errors,
});

/**
 * 유효성 검사 함수를 모두 실행해서 하나라도 통과하지 못하면 false를 반환
 */
const checkValidateIntegrate = () => {
    let isPass = true;
    if (!checkNicknameRule(signupInputs.nickname.value)) isPass = false;
    if (!checkEmailRule(signupInputs.email.value)) isPass = false;
    if (!checkPasswordRule(signupInputs.password.value)) isPass = false;
    if (!checkPasswordCheckRule(signupInputs.password.value, signupInputs.passwordCheck.value)) isPass = false;

    return isPass;
}

const submitSignUp = async () => {

    if (!checkValidateIntegrate()) return;

    const fetchParams: SignupParams = {
        username: signupInputs.email.value,
        nickname: signupInputs.nickname.value,
        password: signupInputs.password.value,
        eventCk: signupAgreeList.checkedItems.includes('event'),
        deviceType: 'WEB',
    }
    
    const { message } = await signup(fetchParams);

    if (message === 'success') {
        const { togglePopupFlag } = piniaPopup();
        const { setAlertValue } = piniaAlert();

        togglePopupFlag(true);
        setAlertValue({
            description: '회원가입이 완료되었습니다.',
            buttons: {
                center: {
                    type: 'OK',
                    label: '확인',
                    onClick: () => {
                        navigateTo(`/`);
                    }
                }
            }
        })
    }
}

</script>