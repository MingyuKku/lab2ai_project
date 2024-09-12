<template>
    <transition name="slide-up" mode="out-in">
        <div
            v-if="piniaAuthInfoValues().socialCheckFlag.modalFlag"
            class="socialSignupCheck fixed bottom-0 z-40 w-full max-w-desktop bg-bg-white rounded-t-3xl pt-5 pb-8 px-primary"
        >
            <div class="signup-agree-list">
                <div class="all-checked flex mb-5">
                    <input
                        type="checkbox"
                        id="all-checked"
                        :checked="isAllChecked"
                        value="all-checked"
                        @change="changeAllChecked"
                        hidden
                    />
                    <label for="all-checked" class="cursor-pointer">
                        <div class="flex">
                            <div
                                class="w-4 h-4 rounded-full p-0.5 mr-2 border"
                                :class="signupAgreeList.checkedItems.length >= CheckItemNames.length ? 'bg-system-mint border-system-mint' : 'border-border-gray-01'"
                            >
                                <IconCheckSm v-if="signupAgreeList.checkedItems.length >= CheckItemNames.length" />
                            </div>
                            <div>
                                <p class="text-body-3">전체동의</p>
                                <p class="text-cap-2m font-normal text-font-dark-01 mt-1">필수동의 항목 및 이벤트 정보 수신(선택)에 전체 동의합니다.</p> 
                            </div>
                        </div>
                    </label>
                </div>
                <ul>
                    <li
                        v-for="item,idx in signupAgreeList.items" :key="idx"
                        class="mb-4 last:mb-0"
                    >
                        <div class="flex">
                            <input
                                type="checkbox"
                                :id="item.name"
                                :checked="isChecked(item.name)"
                                :value="item.name"
                                @change="changeChecked"
                                class="peer"
                                hidden
                            />
                            <label
                                :for="item.name"
                                class="flex items-center justify-between cursor-pointer"
                            >
                                <div class="left flex items-center">
                                    <div
                                        class="w-4 h-4 rounded-full p-0.5 mr-2 border"
                                        :class="signupAgreeList.checkedItems.includes(item.name) ? 'bg-system-mint border-system-mint' : 'border-border-gray-01'"
                                    >
                                        <IconCheckSm v-if="signupAgreeList.checkedItems.includes(item.name)" />
                                    </div>
                                    <span class="text-body-5 mr-1" :class="item.required ? 'text-position-short' : 'text-font-dark-03'">({{ item.required ? '필수' : '선택' }})</span>
                                    <span class="text-body-5">{{ item.label }}</span>
                                </div>
                                <div class="right"></div>
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
            <div
                @click="isAllRequiredChecked() ? startCosign() : undefined"
                :class="isAllRequiredChecked() ? 'bg-system-mint text-font-white' : 'bg-bg-gray-02 text-font-dark-03 cursor-default'"
                class="d-button-st h-[50px] rounded mt-4 text-[16px]"
            >
                코싸인 시작하기
            </div>
        </div>
    </transition>
</template>


<script lang="ts" setup>
import { piniaAuthInfoValues } from '~/pinia/user/piniaAuthInfoValues';
import { CheckItemNames, type CheckItemNamesType } from '~/composables/user/sign-up/business/_types';
import { useSignupData } from '~/composables/user/sign-up/business/useSignupData';
import { useFetchSignup } from '~/composables/user/sign-up/service/useFetchSignup';
import { useGoogleSignIn } from '~/composables/user/sign-in/business/useGoogleSignIn';
import { useRedirectPage } from '~/composables/user/sign-in/business/useRedirectPage';
import type { SocialSignUpParams } from '~/composables/user/sign-up/service/_types';



const { signupAgreeList, toggleSignupAgreeListAllCheck, updateSignupAgreeList, isAllRequiredChecked } = useSignupData();

const isAllChecked = computed(() => signupAgreeList.checkedItems.length >= CheckItemNames.length);

const isChecked = computed(() => {
    return (name: CheckItemNamesType) => {
        if (signupAgreeList.checkedItems.includes(name)) return true;
        return false;
    }
})


const changeAllChecked = () => {
    toggleSignupAgreeListAllCheck();
}

const changeChecked = (e: Event) => {
    const target = e.target as HTMLInputElement;
    updateSignupAgreeList(target.value as CheckItemNamesType);
}


const callSocialSignup = async ({ loginResponse, socialLoginType }: Pick<SocialSignUpParams, 'loginResponse' | 'socialLoginType'>) => {
    const { closeSocialCheckPopupBySocial } = piniaAuthInfoValues();
    const { socialSignup } = useFetchSignup({});

    const eventCk = signupAgreeList.checkedItems.includes('event');

    if (eventCk === undefined || eventCk === null) return;
    
    const { message } = await socialSignup({
        loginResponse,
        event: eventCk,
        socialLoginType
    });

    if (message === 'success') {
        closeSocialCheckPopupBySocial();
        useRedirectPage();
    }
}


const startCosign = async () => {

    const { socialCheckFlag } = piniaAuthInfoValues();

    if (socialCheckFlag.appleJwt !== null) {
        callSocialSignup({
            loginResponse: socialCheckFlag.appleJwt,
            socialLoginType: 'APPLE'
        })
    }

    if (socialCheckFlag.googleInfo !== null) {
        callSocialSignup({
            loginResponse: socialCheckFlag.googleInfo,
            socialLoginType: 'GOOGLE'
        })
    }
}



</script>