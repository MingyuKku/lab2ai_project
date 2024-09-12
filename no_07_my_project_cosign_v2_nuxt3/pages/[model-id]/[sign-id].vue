<template>
    <div class="sign-detail-page pt-app-header">
        <CommonHeadersAppHeader>
            <template #left>
                <div class="flex items-center">
                    <CommonHeadersBackHeaderIcon />
                    <h1 class="text-h2 ml-1">AI 예측 SIGN</h1>
                    <div v-if="signProfile && isFreeSign(signProfile.ticket, signProfile.pay, signProfile.signStatusType)" class="flex w-[73px] h-[21px] rounded-sm overflow-hidden ml-2"><SignDetailFreeSign /></div>
                </div>
            </template>
        </CommonHeadersAppHeader>
        <section v-if="signProfile" class="bg-bg-white">
            <SignDetailSignProfile :item="signProfile" />
            <SignDetailSignEnd v-if="signProfile.signStatusType === 'END'" :item="signProfile" />
            <SignDetailTvTechChartBlurView v-if="isSignBlur(signProfile.pay, signProfile.ticket, signProfile.signStatusType)" />
            <SignDetailTvTechChartView v-else :signProfile="signProfile" />
            <SignDetailSignOn
                v-if="
                    signProfile.signStatusType !== 'END' &&
                    !isSignBlur(signProfile.pay, signProfile.ticket, signProfile.signStatusType)" 
                :item="signProfile"
            />
        </section>
        <section v-if="isSignDetailContent">
            <SignDetailFluidContent1
                :title="SignDetailContentTitle"
                title-type="html"
                :item="signDetailContent"
            />
        </section>
        <section class="mt-2 pb-space-page-bottom bg-bg-white">
            <SignDetailFluidContent2
                :title="`다른 모델의 ${anotherModelSigns?.digitalAssetsCode} SIGN`"
                :items="anotherModelSigns?.signItemResponse"
            />
            <CommonAd
                v-if="!signProfile?.ticket"
                class=""
                :adsense="{
                    slot: '6138258041',
                    widthResponsive: true,
                    style: {
                        'display': 'block',
                        'height': '100px',
                    }
                }"
                :adfit="{
                    src: '//t1.daumcdn.net/kas/static/ba.min.js',
                    unit: 'DAN-80sIapztZbVlueNZ',
                    width: '320',
                    height: '100',
                }"
            />
            <SignDetailSignlist
                title="최근 등록된 SIGN"
                :items="recentSignlist"
            />
        </section>
    </div>
</template>


<script lang="ts" setup>
import { isSignBlur } from '~/composables/home/business/_methods';
import { usePromiseAllSettled1 } from '~/composables/sign-detail/service/usePromiseAllSettled1';
import { usePromiseAllSettled2 } from '~/composables/sign-detail/service/usePromiseAllSettled2';
import { useSignDetailContent } from '~/composables/sign-detail/business/useSignDetailContent';
import { SIGN_DETAIL_CONTENT, SIGN_DETAIL_PROFILE } from '~/composables/_app/asyncDataFetchKeys';
import { isFreeSign } from "~/composables/home/business/_methods";
import { useStateLocale } from '~/composables/useState/locale';
import { useSignDetailMetaHeadOg } from '~/composables/sign-detail/business/useSignDetailMetaHeadOg';

const { params } = useRoute();
const { modelid, signid } = params;
const { getLocales } = useStateLocale();
const locales = getLocales();

const profileDataKey = `${SIGN_DETAIL_PROFILE}-${signid}`;
const { signProfile, recentSignlist } = await usePromiseAllSettled1({
    useAsyncKey: profileDataKey,
    locale: locales.value[0] as string,
    modelid: modelid as string,
    signid: signid as string
});
// console.log('싸인 프로필', signProfile.value)

const detailContentKey = `${SIGN_DETAIL_CONTENT}-${signid}`;
const { signDetailContent, anotherModelSigns } = await usePromiseAllSettled2({
    useAsyncKey: detailContentKey,
    modelid: modelid as string,
    digitalAssetsId: signProfile.value?.digitalAssetsId,
})


const { isSignDetailContent, SignDetailContentTitle } = useSignDetailContent(signDetailContent.value);

useSignDetailMetaHeadOg(signProfile.value);

</script>