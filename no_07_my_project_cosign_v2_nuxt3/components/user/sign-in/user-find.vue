<template>
    <div class="user-find flex justify-center">
        <div class="flex items-center text-body-4 font-normal text-font-dark-03">
            <div class="px-5 relative">
                <NuxtLink to="/user/findPassword" class="" replace>비밀번호 찾기</NuxtLink>
                <span class="absolute top-[calc(50%+1px)] right-0 -translate-y-1/2 bg-border-gray-01 w-[1px] h-[13px]"></span>
            </div>
            <div class="px-5"><NuxtLink to="/user/sign-up">회원가입</NuxtLink></div>
        </div>
    </div>
</template>