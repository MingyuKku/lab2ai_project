import type { SocialLoginType } from "../../sign-up/service/_types";
import type { AppleJwtLoginResponse, GoogleLoginResponse } from "../business/_types";

export const SignInDeviceType = [ 'WEB', 'AOS', 'IOS' ] as const;

export interface CosignSigninParams {
    username: string;
    password: string;
    deviceType: typeof SignInDeviceType[number];
}



export interface SocialSignInParams {
    st: SocialLoginType;
    loginResponse: GoogleLoginResponse | AppleJwtLoginResponse;
}


export interface SocialSignInRes {
    data: {
        login: SocialLogin;
    }
    // isSuccess: boolean;
    accessToken: any;
}

type SocialLoginResType = 'USER' | 'NON_USER' | 'GOOGLE_USER' | 'APPLE_USER';
interface SocialLogin {
    loginType: SocialLoginResType;
    reason: string;
}
