import { jwtDecode } from "~/composables/_auth/_methods";
import type { AppleJwtLoginResponse } from "./_types";
import { useFetchSignin } from "../service/useFetchSignin";
import { useSocialSignInCommon } from "./useSocialSignInCommon";
import { useAuthTokenCookies } from "~/composables/useCookie/auth-token";
import { piniaAuthInfoValues } from "~/pinia/user/piniaAuthInfoValues";
import { piniaPopup } from "~/pinia/popup/piniaPopup";
import { piniaAlert } from "~/pinia/popup/piniaAlert";
import { useFetchSignup } from "../../sign-up/service/useFetchSignup";
import { useRedirectPage } from "./useRedirectPage";

export const useAppleSignIn = () => {

    const { togglePopupFlag } = piniaPopup();
    const { setAlertValue, hiddenAlert } = piniaAlert();
    
    const showApplePopup = () => {
        const clientId = 'cosignapp.lab2ai.com';
        const scope = 'name email';
        const redirectURI = `${location.origin}/cert/redirect/apple`;
        // const redirectURI = `/cert/redirect/apple`;
        const state = 'main_feed';
        const nonce = 'cosign';
        const usePopup = true;

        // AppleID는 nuxt.config.js의 appleid.auth.js에서 가져온다.
        AppleID.auth.init({
            clientId,
            scope,
            redirectURI,
            state,
            nonce,
            usePopup
        })

        // Listen for authorization success.
        document.addEventListener('AppleIDSignInOnSuccess', (event) => {
            // Handle successful response.
            const customEvent = event as CustomEvent;
            console.log('이건 뭐지', customEvent)
            if (customEvent.type === "AppleIDSignInOnSuccess") {
                loginOrShowCheckPopup(customEvent);
            }

            // 팝업을 어떻게 닫게 하지?
        });

        // Listen for authorization failures.
        document.addEventListener('AppleIDSignInOnFailure', (event) => {
            // Handle error.
            console.log("error", event);
        });
    }


    const loginOrShowCheckPopup = async (event: CustomEvent) => {
        const loginResponse = buildLoginResponseByIdToken(event.detail.authorization.id_token);

        const { onAfterLogin, showMergeAccountDialog } = useSocialSignInCommon();
        const { socialSignin } = useFetchSignin();

        // const {data: {login}, accessToken} = await useLogin(JSON.stringify(loginResponse));
        const res = await socialSignin({
            st: 'APPLE',
            loginResponse
        })

        if (!res) return;
        const { data: { login } } = res;
        
        switch (login.loginType) {
            case "USER":
                const { getAccToken } = useAuthTokenCookies();
                const token = getAccToken();
                if (!token.value) return;
                onAfterLogin(token.value);
                break;
            case "NON_USER":
                showSocialCheckPopup(loginResponse);
                break;
            case "GOOGLE_USER":
            case "APPLE_USER":
                showMergeAccountDialog<AppleJwtLoginResponse>(async (loginResponse: AppleJwtLoginResponse) => {
                    hiddenAlert();
                    togglePopupFlag(false);

                    const { socialSignup } = useFetchSignup({});
                    const { message } = await socialSignup({
                        loginResponse,
                        event: true,
                        socialLoginType: 'APPLE'
                    })

        
                    if (message === 'success') {
                        useRedirectPage();
                    }
                    
                }, loginResponse);
                break;
        }
    }


    const buildLoginResponseByIdToken = (idToken: string): AppleJwtLoginResponse => {
        const decoded:any = jwtDecode(idToken);
        
        let loginResponse: AppleJwtLoginResponse = {
            nonce_supported: decoded["nonce_supported"],
            auth_time: decoded["auth_time"],
            is_private_email: decoded["is_private_email"],
            email_verified: decoded["email_verified"],
            // email: decoded["email"],
            // "c_hash": decoded["c_hash"], 존재하지 않음
            sub: decoded["sub"],
            iat: decoded["iat"],
            exp: decoded["exp"],
            aud: decoded["aud"],
            iss: decoded["iss"],
        }
    
        if (loginResponse.is_private_email !== "true") {
            loginResponse = {
                ...loginResponse,
                email: decoded["email"]
            }
        }
    
        return loginResponse;
    }


    const showSocialCheckPopup = (loginResponse: AppleJwtLoginResponse) => {
        const { showSocialCheckPopupByApple } = piniaAuthInfoValues();
    
        showSocialCheckPopupByApple(loginResponse);
    }

    return {
        showApplePopup,
    }
}