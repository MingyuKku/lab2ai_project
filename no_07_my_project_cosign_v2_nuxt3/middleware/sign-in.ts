import { piniaAuthInfoValues } from "~/pinia/user/piniaAuthInfoValues"

export default defineNuxtRouteMiddleware((to, from) => {
    const { isUserSignedIn }  = piniaAuthInfoValues();

    if (to.name === from.name) return;
    
    const { updateAuthState } = piniaAuthInfoValues();

    updateAuthState({
        redirectRoutePage: from.fullPath
    });

})