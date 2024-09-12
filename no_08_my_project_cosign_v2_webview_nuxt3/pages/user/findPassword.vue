<template>
    <div class="user-find-password min-h-viewScreen bg-bg-white">
        <!-- <CommonHeadersAppHeader>
            <template #left>
                <div class="flex items-center">
                    <CommonHeadersBackHeaderIcon />
                </div>
            </template>
        </CommonHeadersAppHeader> -->
        <section class="p-primary">
            <div class="title text-center">
                <h1 class="text-h2">비밀번호 찾기</h1>
                <div class="text-body-3r mt-4">
                    <p>가입한 이메일 주소로 임시 비밀번호를 알려드립니다.</p>
                    <p>로그인 후 비밀번호를 변경해 주세요.</p>
                </div>
            </div>
            <CommonPartsFormInputBox
                :id="findPasswordValue.email.id"
                type="email"
                :value="findPasswordValue.email.value"
                :setValue="findPasswordValue.email.setValue"
                :label="findPasswordValue.email.label"
                :tips="findPasswordValue.email.tips"
                :errors="findPasswordValue.email.errors"
                autocomplete="off"
                :placeholder="findPasswordValue.email.placeholder"
                class="mt-7"
            />
            <button
                type="button"
                @click="submitUpdate"
                class="d-button-st w-full h-[50px] mt-5 rounded"
                :disabled="!checkValuesEmpty"
                :class="checkValuesEmpty ? 'bg-system-mint text-font-white' : 'bg-bg-gray-02 text-bg-dark-03'"
            >
                임시 비밀번호 전송
            </button>
        </section>
    </div>
</template>


<script lang="ts" setup>
import { useValues } from '~/composables/user/find-password/business/useValues';
import { useValidate } from '~/composables/user/sign-up/business/useValidate';
import { useFetchFindPassword } from '~/composables/user/find-password/service/useFetchFindPassword'
import { piniaAlert } from '~/pinia/popup/piniaAlert';
import { piniaPopup } from '~/pinia/popup/piniaPopup';
import { messageWebview } from '~/composables/_app/useFlutterWebview';

// definePageMeta({
//     middleware: 'auth',
// })

const { findPasswordValue } = useValues();

const { checkEmailRule } = useValidate({
    emailErrors: findPasswordValue.email.errors,
})


const checkValuesEmpty = computed(() => {
    if (findPasswordValue.email.value.length < 1) return false;
    return true;
})



const submitUpdate = async () => {

    if (!checkEmailRule(findPasswordValue.email.value)) return;

    const { message } = await useFetchFindPassword(findPasswordValue.email.value);

    if (message === 'fail') return alert('예상치 못한 예외가 발생 했습니다. 관리자에게 문의 해주세요.');

    messageWebview(`dialog_success_find_password`);
    
    // const { togglePopupFlag } = piniaPopup();
    // const { setAlertValue } = piniaAlert();


    // togglePopupFlag(true);
    // setAlertValue({
    //     description: '성공했습니다. 메일을 확인해주세요',
    //     buttons: {
    //         center: {
    //             type: 'OK',
    //             label: '확인',
    //             onClick: () => {
    //                 navigateTo(`/user/sign-in/cosign`, { replace: true })
    //             }
    //         }
    //     }
    // })
}

</script>