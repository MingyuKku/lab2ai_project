<template>
    <div class="user-withdrawal pt-app-header bg-bg-white min-h-viewScreen">
        <CommonHeadersAppHeader>
            <template #left>
                <div class="flex items-center">
                    <CommonHeadersBackHeaderIcon />
                    <h1 class="text-h2 ml-1">회원탈퇴</h1>
                </div>
            </template>
        </CommonHeadersAppHeader>
        <section class="px-primary">
            <UserWithdrawalNotification :email="res?.email" :agree="agree" :updateAgree="updateAgree" />
            <div v-if="userType === 'COSIGN'" class="only-cosign-user">
                <CommonPartsFormInputBox
                    :id="withdrawal.email.id"
                    type="email"
                    :label="withdrawal.email.label"
                    :value="withdrawal.email.value"
                    :disabled="withdrawal.email.disabled"
                    class="mt-7"
                />
                <CommonPartsFormInputBox
                    :id="withdrawal.passwordCheck.id"
                    type="password"
                    :label="withdrawal.passwordCheck.label"
                    :value="withdrawal.passwordCheck.value"
                    :setValue="withdrawal.passwordCheck.setValue"
                    :errors="withdrawal.passwordCheck.errors"
                    :placeholder="withdrawal.passwordCheck.placeholder"
                    class="mt-7"
                />
            </div>

            <div class="buttons flex items-center mt-6">
                <NuxtLink to="/" class="cancle flex-1 d-button-st h-[50px] bg-bg-black rounded mr-3 text-[16px]">
                    계속 이용하기
                </NuxtLink>
                <div
                    @click="agree ? onClickWithdrawal() : undefined"
                    class="ok flex-1 d-button-st h-[50px] rounded text-font-black border border-bg-black bg-bg-white text-[16px]"
                    :class="agree ? 'opacity-1' : 'opacity-30 cursor-default'"
                >
                    탈퇴하기
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { useWithdrawalValues } from '~/composables/withdrawal/business/useWithdrawalValues';
import { useDecodeToken } from '~/composables/withdrawal/business/useDecodeToken';
import { useFetchUserTicket } from '~/composables/menu/service/useFetchUserTicket';
import { useFetchUserInfoUpdate } from '~/composables/user/mypage/service/useFetchUserInfoUpdate';
import { piniaAlert } from '~/pinia/popup/piniaAlert';
import { piniaPopup } from '~/pinia/popup/piniaPopup';
import { useFetchWithdrawal } from '~/composables/withdrawal/service/useFetchWithdrawal';
import { useFetchSignout } from '~/composables/user/sign-out/service/useFetchSignout';
import { useValidate } from '~/composables/user/sign-up/business/useValidate';

definePageMeta({
    middleware: 'auth',
})

const { getUserInfo } = useFetchUserInfoUpdate({});
const { getUserTicket } = useFetchUserTicket();

const { withdrawal } = useWithdrawalValues();
const { userType, initTokenDecode } = useDecodeToken();
const { checkPasswordRule } = useValidate({
    passwordErrors: withdrawal.passwordCheck.errors
})

initTokenDecode();

const res = await getUserInfo();
const ticket = await getUserTicket();
withdrawal.email.setValue(res?.email);


const agree = ref(false);

const updateAgree = (value: boolean) => {
    agree.value = value;
}


/**
 * @return true를 반환하면 통과
 */
const checkAgreeValidate = () => {
    if (userType.value === 'COSIGN') {
        if (!agree.value) return false;
        return checkPasswordRule(withdrawal.passwordCheck.value);

    } else {
        if (!agree.value) return false;
    }
    
    
    return true;
}

const onClickWithdrawal = () => {
    if (!checkAgreeValidate()) return;


    if (
        ticket &&
        ticket.passStatusType !== null &&
        ticket.passType !== null
    ) return alert('아직 사용 중인 이용권이 있습니다. 고객센터로 문의해 주세요.');


    const { togglePopupFlag } = piniaPopup();
    const { setAlertValue } = piniaAlert();
    const { push } = useRouter();

    togglePopupFlag(true);
    setAlertValue({
        title: '정말 탈퇴하시겠습니까?',
        description: ['회원탈퇴를 하시면 회원님의 모든 데이터가 삭제됩니다.', '그래도 회원을 탈퇴하시겠습니까?'],
        buttons: {
            left: {
                type: 'OK',
                label: '계속 이용하기',
                onClick: () => {
                    navigateTo(`/`)
                }
            },
            right: {
                type: 'CANCLE',
                label: '탈퇴하기',
                onClick: async () => {
                    const { snsWithdrawal, cosignWithdrawal } = useFetchWithdrawal();
                    // const { signout } = useFetchSignout();
                    
                    if (
                        userType.value === 'GOOGLE' ||
                        userType.value === 'APPLE'
                    ) {
                        
                        const { message } = await snsWithdrawal();
                        if (message === 'fail') return;
                    }

                    if (userType.value === 'COSIGN') {
                        if (!res || !res.email) return;
                        const { message } = await cosignWithdrawal({
                            username: res.email,
                            password: withdrawal.passwordCheck.value
                        });
                        if (message === 'fail') return;
                    }
                    
                    window.location.reload();
                    // signout();
                }
            }
        }
    })
}

</script>