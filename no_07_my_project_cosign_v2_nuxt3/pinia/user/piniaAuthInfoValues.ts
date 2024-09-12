import { useAuthTokenCookies } from "~/composables/useCookie/auth-token";
import { PiniaAuthInfoValues } from "../keys";
import type { AuthState } from "./_types";
import type { AppleJwtLoginResponse, GoogleLoginResponse } from "~/composables/user/sign-in/business/_types";
import { piniaPopup } from "../popup/piniaPopup";

export const piniaAuthInfoValues = defineStore(PiniaAuthInfoValues, () => {

    const authState = reactive<AuthState>({
        isUserSignedIn: false,
        redirectRoutePage: null,
    })


    /**
     * true => 로그인, false => 비로그인
     */
    const isUserSignedIn = computed(() => {
        if (authState.isUserSignedIn) return true;
        else {
            const { getAccToken } = useAuthTokenCookies();
            const token = getAccToken();
            if (token.value) return true;
        }

        return false;
    })


    const updateAuthState = (value: Partial<AuthState>) => {
        if (value.isUserSignedIn !== undefined) {
            authState.isUserSignedIn = value.isUserSignedIn;
            clearNuxtData() // 로그인 상태 업데이트 후 모든 캐시된 넉스트데이타(asyncData) 제거
        }
        if (value.redirectRoutePage) authState.redirectRoutePage = value.redirectRoutePage;
    }

    

    // ================= 소셜 로그인 ==============================================

    const socialCheckFlag = reactive<{
        modalFlag: boolean;
        appleJwt: AppleJwtLoginResponse | null;
        googleInfo: GoogleLoginResponse | null;
      }>({
        modalFlag: false,
        appleJwt: null,
        googleInfo: null
    })


    
    const showSocialCheckPopupByGoogle = (loginResponse: GoogleLoginResponse) => {
        const { togglePopupFlag } = piniaPopup();
        socialCheckFlag.googleInfo = loginResponse;
        togglePopupFlag(true);
        socialCheckFlag.modalFlag = true;
    }

    const closeSocialCheckPopupBySocial = () => {
        const { togglePopupFlag } = piniaPopup();
        togglePopupFlag(false);
        socialCheckFlag.modalFlag = false;
    }


    const showSocialCheckPopupByApple = (loginResponse: AppleJwtLoginResponse) => {
        const { togglePopupFlag } = piniaPopup();
        socialCheckFlag.appleJwt = loginResponse;
        togglePopupFlag(true);
        socialCheckFlag.modalFlag = true;
    }


    return {
        authState,
        isUserSignedIn,
        updateAuthState,
        socialCheckFlag,
        showSocialCheckPopupByGoogle,
        closeSocialCheckPopupBySocial,
        showSocialCheckPopupByApple,
    }
})