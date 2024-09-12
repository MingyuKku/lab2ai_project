import { piniaAuthInfoValues } from "~/pinia/user/piniaAuthInfoValues"

export default defineNuxtRouteMiddleware(async (to, from) => {

    const { isUserSignedIn } = piniaAuthInfoValues();
    
    if (isUserSignedIn) return;

    return navigateTo(`/`)
})


