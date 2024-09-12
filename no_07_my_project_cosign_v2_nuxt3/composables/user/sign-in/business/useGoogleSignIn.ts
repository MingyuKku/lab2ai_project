import { useAuthTokenCookies } from "~/composables/useCookie/auth-token";
import { piniaAuthInfoValues } from "~/pinia/user/piniaAuthInfoValues";
import { useRedirectPage } from "./useRedirectPage";
import type { GoogleEndpointParams, GoogleLoginResponse, TokenInfoResponse } from "./_types";
import type { BasicRes } from "~/composables/_api/_types";
import { piniaPopup } from "~/pinia/popup/piniaPopup";
import { piniaAlert } from "~/pinia/popup/piniaAlert";
import { useFetchSignup } from "../../sign-up/service/useFetchSignup";
import { useFetchSignin } from "../service/useFetchSignin";
import { useSocialSignInCommon } from "./useSocialSignInCommon";

export const useGoogleSignIn = () => {

    const { togglePopupFlag } = piniaPopup();
    const { setAlertValue, hiddenAlert } = piniaAlert();

    const showGoogleLoginPage = () => {
        const clientId = "306303946038-v2f3q95j8rfe5qq9o4tgjjnnbn154lsc.apps.googleusercontent.com";
        const projectId = "cosign-911d2";
        // Google's OAuth 2.0 endpoint for requesting an access token
        const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
        const redirectUrl = `${location.origin}/cert/redirect/google`;
        
        var form = document.createElement('form');
        form.setAttribute('method', 'GET'); // Send as a GET request.
        form.setAttribute('action', oauth2Endpoint);
    
        // Parameters to pass to OAuth 2.0 endpoint.
        const params: GoogleEndpointParams = {
            'client_id': clientId,
            'redirect_uri': redirectUrl,
            'response_type': 'token',
            'scope': 'https://www.googleapis.com/auth/userinfo.profile',
            'include_granted_scopes': 'true',
            'state': 'pass-through value'
        };
    
        // Add form parameters as hidden input values.
        for (let p in params) {
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', p);
            input.setAttribute('value', params[p]);
            form.appendChild(input);
        }
    
        // Add form to page and submit it to open the OAuth 2.0 endpoint.
        document.body.appendChild(form);
        form.submit();
    }

    
    
    


    const showSocialCheckPopup = (loginResponse: GoogleLoginResponse) => {
        const { showSocialCheckPopupByGoogle } = piniaAuthInfoValues();
    
        showSocialCheckPopupByGoogle(loginResponse);
    }
    
    const initGoogleLoginFunc = () => {
        const { onAfterLogin } = useSocialSignInCommon();
        const { showMergeAccountDialog } = useSocialSignInCommon();

        window.social = {
            google: {
                login: onAfterLogin,
                signup: showSocialCheckPopup,
                merge: (loginResponse: GoogleLoginResponse) => {
                    showMergeAccountDialog<GoogleLoginResponse>(async (loginResponse: GoogleLoginResponse) => {
                        hiddenAlert();
                        togglePopupFlag(false);
                        
                        const { socialSignup } = useFetchSignup({});
                        const { message } = await socialSignup({
                            loginResponse,
                            event: true,
                            socialLoginType: 'GOOGLE'
                        })

            
                        if (message === 'success') {
                            useRedirectPage();
                        }

                    }, loginResponse);
                }
            }
        }
    }



    const loginOrShowPopupToParentByGoogle = async (googleAccessToken: string) => {
        const googleLoginResponse = await getGoogleLoginResponseByGoogleAccessToken(googleAccessToken);
        
        if (!googleLoginResponse) return;

        const { socialSignin } = useFetchSignin();

        const res = await socialSignin({
            st: 'GOOGLE',
            loginResponse: googleLoginResponse
        })

        // alert(`너 뭐야!!${JSON.stringify(res)}`)
        if (!res) return;

        const { data: { login } } = res;
    
        const openerHelper = window.opener.social as SocialHelper;
    
        switch (login.loginType) {
            case "USER":
                const { getAccToken } = useAuthTokenCookies();
                const token = getAccToken();
                if (token.value) {
                    openerHelper.google.login(token.value);
                }
                break;
            case "NON_USER":
                openerHelper.google.signup(googleLoginResponse);
                break;
            case "GOOGLE_USER":
            case "APPLE_USER":
                openerHelper.google.merge(googleLoginResponse);
                break;
        }
    
        window.close();
    }


    const getGoogleLoginResponseByGoogleAccessToken = async (googleAccessToken: string): Promise<GoogleLoginResponse | null> => {
        const userInfoUrl = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleAccessToken}`;
        const tokenUrl = `https://oauth2.googleapis.com/tokeninfo?access_token=${googleAccessToken}`;
    
        const userInfoRes = await $fetch<any>(userInfoUrl);  
        const tokenRes = await $fetch<TokenInfoResponse>(tokenUrl);

        if (tokenRes["aud"]) {
            const loginResponse: GoogleLoginResponse = {
                exp: tokenRes['exp'],
                aud: tokenRes['aud'],
                sub: tokenRes['sub'],
                azp: tokenRes['azp'],
    
                locale: userInfoRes['locale'],
                family_name: userInfoRes['family_name'],
                given_name: userInfoRes['given_name'],
                picture: userInfoRes['picture'],
                name: userInfoRes['name'],
                email: userInfoRes['email'],
                email_verified: userInfoRes['verified_email']
            }
    
            return loginResponse;
        } else {
            return null;
        }
    }



    return {
        showGoogleLoginPage,
        initGoogleLoginFunc,
        loginOrShowPopupToParentByGoogle,
    }
}