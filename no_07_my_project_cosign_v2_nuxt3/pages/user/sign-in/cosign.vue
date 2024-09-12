<template>
    <div class="user-signin-cosign pt-app-header h-viewScreen bg-bg-white">
        <CommonHeadersAppHeader>
            <template #left>
                <div class="flex items-center">
                    <CommonHeadersBackHeaderIcon />
                    <h1 class="text-h2 ml-1">COSIGN 로그인</h1>
                </div>
            </template>
        </CommonHeadersAppHeader>
        <div class="content-wrap p-primary pt-24">
            <div class="title mb-[30px]">
                <div class="flex items-center text-h4">
                    <div class="logo w-[68px] mt-0.5 mr-[3px]">
                        <NuxtImg
                            :src="`${$config.public.IMAGE_URL}version1/common/cosign_bi.svg`"
                            alt="cosign"
                            format="webp"
                            loading="lazy"
                            width="68"
                            height="19"
                        />
                    </div>
                    <h1>서비스 이용을 위해</h1>
                </div>
                <h1 class="text-h4 mt-0.5">로그인해 주세요.</h1>
            </div>

            <div class="form-area">
                <form @submit="submitSignIn" @keyup="onChangeFormValue">
                    <div class="user-input-wrap mb-5">
                        <UserSignInUserInput
                            :id="usernameInputName"
                            type='text'
                            placeholder="아이디(이메일)"
                            autocomplete="off"
                            class="username mb-3"
                        />
                        <UserSignInUserInput
                            :id="passwordInputName"
                            type='password'
                            placeholder="비밀번호"
                            autocomplete="off"
                            class="password"
                        />
                    </div>
                    <button
                        type="submit" 
                        class="login-button-st"
                        :class="{'disable': !isActiveSubmitButton}"
                        :disabled="!isActiveSubmitButton"
                    >로그인</button>
                </form>
            </div>
        </div>
        <UserSignInUserFind />
    </div>
</template>

<script lang="ts" setup>
import type { TargetObject } from './_types';
import { useFetchSignin } from '~/composables/user/sign-in/service/useFetchSignin';
import { useCosignSignIn } from '~/composables/user/sign-in/business/useCosignSignIn';
import { useRedirectPage } from '~/composables/user/sign-in/business/useRedirectPage';

// definePageMeta({
//     middleware: 'sign-in',
// })

const usernameInputName = 'username';
const passwordInputName = 'password';

const {
    isActiveSubmitButton,
    onChangeFormValue
} = useCosignSignIn([usernameInputName, passwordInputName]);


async function submitSignIn(e:Event) {
    e.preventDefault();

    const username = (e.target as TargetObject)[usernameInputName].value;
    const password = (e.target as TargetObject)[passwordInputName].value;
    const deviceType = 'WEB';
    
    const { signin } = useFetchSignin();
    const { message } = await signin({
        username,
        password,
        deviceType
    });

    if (message === 'success') {
        useRedirectPage();
    }
}

</script>