<template>
    <div class="container">
        <form action="https://safe.ok-name.co.kr/CommonSvl" method="POST" v-if="companyCode !== null">
            <input type="hidden" name="tc" value="kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd"/>    <!-- 변경불가-->
            <input type="hidden" name="cp_cd" :value="companyCode"> <!-- 회원사코드 -->
            <input type="hidden" name="mdl_tkn" :value="token"> <!-- 토큰 --> 
            <input type="hidden" name="target_id" value="">
            <button ref="btnSubmit" type="submit"></button>
        </form>
    </div>
</template>
    
<script setup lang="ts">
interface CertRequestResult {
    resultCode: string;
    resultMessage: string;
    token: string;
    companyCode: string;
    isSuccess: boolean;
}

const companyCode = ref<string | null>(null);
const token = ref<string | null>(null);
const btnSubmit = ref<HTMLElement | null>(null);

onMounted(async () => {
    const { $serviceContentApiFetch } = useNuxtApp();

    let formData = new FormData();
    formData.append('url', `${window.location.origin}/cert/cellphone/response`)

    const data = await $serviceContentApiFetch<CertRequestResult>(`cert/request`,
    {
        method: "POST",
        credentials: "include",
        body: formData
    });

    companyCode.value = data.companyCode;
    token.value = data.token;

    nextTick(() => {
        btnSubmit.value?.click();
    })
})

</script>