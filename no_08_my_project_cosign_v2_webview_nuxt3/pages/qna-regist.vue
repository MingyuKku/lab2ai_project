<template>
    <div class="qna-regist-page bg-bg-white">
        <!-- <CommonHeadersAppHeader>
            <template #left>
                <div class="flex items-center">
                    <CommonHeadersBackHeaderIcon />
                    <h1 class="text-h2 ml-1">1:1 문의 작성</h1>
                </div>
            </template>
        </CommonHeadersAppHeader> -->
        <section class="px-primary">
            <CommonPartsFormInputBox
                id="email"
                type="email"
                :value="res?.email"
                label="이메일"
                :disabled="true"
                class="mt-7"
            />
            <CommonPartsFormTextareaBox
                :value="qnaValue.content.value"
                :setValue="qnaValue.content.setValue"
                :label="qnaValue.content.label"
                :placeholder="qnaValue.content.placeholder"
                rows="12"
                class="mt-7"
            />
            <CustomerQnaFileInput
                :files="qnaValue.files"
                :tips="qnaValue.files.tips"
                :errors="qnaValue.files.errors"
                :updateFiles='updateFiles'
                :deleteFile="deleteFile"
                class="mt-7"
            />
            <CustomerQnaCautions class="mt-7" />
            <button
                type="button"
                @click="submitUpdate"
                class="d-button-st w-full h-[50px] mt-5 rounded"
                :disabled="!checkValuesEmpty"
                :class="checkValuesEmpty ? 'bg-system-mint text-font-white' : 'bg-bg-gray-02 text-bg-dark-03'"
            >
                제출하기
            </button>
        </section>
    </div>
</template>

<script lang="ts" setup>
import type { GetAgentInfo } from '~/composables/customer/business/_types';
import { useFetchUserInfoUpdate } from '~/composables/user/mypage/service/useFetchUserInfoUpdate';
import { useQnaValues } from '~/composables/customer/business/useQnaValues';
import { useValidateFile } from '~/composables/customer/business/useValidateFile';
import { useUseragent } from '~/composables/customer/business/useUseragent';
import { useFetchQna } from '~/composables/customer/service/useFetchQna';
import { piniaAlert } from '~/pinia/popup/piniaAlert';
import { piniaPopup } from '~/pinia/popup/piniaPopup';
import { messageWebview } from '~/composables/_app/useFlutterWebview';
import { CUSTOMER_MY_QNA } from '~/composables/_app/asyncDataFetchKeys';


definePageMeta({
    middleware: 'auth',
})


const { getUserInfo } = useFetchUserInfoUpdate({});

const res = await getUserInfo();


const { qnaValue, updateFiles, deleteFile } = useQnaValues();
const { checkFileLength, checkFileSize } = useValidateFile({
    fileErrors: qnaValue.files.errors
});


const checkValuesEmpty = computed(() => {
    if (qnaValue.content.value.length < 1) return false;
    return true;
})


const submitFlag = ref(false);
const { getBrowser, getOsVersion } = useUseragent();
const { getFormDataParam, submitQna } = useFetchQna();

const submitUpdate = async () => {
    if (!res || !res.email) return;
    if (submitFlag.value) return;
    submitFlag.value = true;

    if (!checkFileLength(qnaValue.files.attachFileList.length)) return;
    if (!checkFileSize(qnaValue.files.attachFileSize)) return;

    messageWebview(`submit_inquiry`);

    const getAgentInfo:GetAgentInfo = {
        platform: null,
        appVersion: null,
        osVersion: null,
        deviceModel: null,
        browser: null,
    };

    window.sendUserAgent = function (agentInfo: string):void {
        const agent = JSON.parse(agentInfo);

        getAgentInfo.platform = agent.platform;
        getAgentInfo.appVersion = agent.appVersion;
        getAgentInfo.osVersion = agent.osVersion;
        getAgentInfo.deviceModel = agent.deviceModel;

        sendRegist(getAgentInfo);
    }
}


const sendRegist = (getAgentInfo: GetAgentInfo) => {
    if (!res || !res.email) return;
    
    const formData = getFormDataParam({
        email: res.email,
        content: qnaValue.content.value,
        attachFileList: qnaValue.files.attachFileList,
        getAgentInfo
    })

    submitQna(formData)
    .then(res => {
        openAlertPopup();
    })
    .catch(err => {

    })
    .finally(() => {
        submitFlag.value = false;
    })
}


const openAlertPopup = () => {
    const { togglePopupFlag } = piniaPopup();
    const { setAlertValue } = piniaAlert();

    togglePopupFlag(true);
    setAlertValue({
        description: '제출이 완료되었습니다.',
        buttons: {
            center: {
                type: 'OK',
                label: '확인',
                onClick: () => {
                    clearNuxtData(CUSTOMER_MY_QNA); // 기존 질문 리스트 캐시 데이터 제거
                    navigateTo(`/customer/qna`);
                }
            }
        }
    })
}

</script>