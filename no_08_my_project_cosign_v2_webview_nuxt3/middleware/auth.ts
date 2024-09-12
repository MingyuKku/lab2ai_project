import { messageWebview } from "~/composables/_app/useFlutterWebview";
import { piniaAuthInfoValues } from "~/pinia/user/piniaAuthInfoValues"

export default defineNuxtRouteMiddleware(async (to, from) => {

    const { isUserSignedIn } = piniaAuthInfoValues();
    
    if (isUserSignedIn) return;

    messageWebview(`https://cosign/login`);
    return abortNavigation(); // 페이지 라우팅 중단
    // return navigateTo(`/`)
})


