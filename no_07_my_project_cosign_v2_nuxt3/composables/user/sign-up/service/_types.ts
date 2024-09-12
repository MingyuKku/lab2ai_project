import type { AppleJwtLoginResponse, GoogleLoginResponse } from "../../sign-in/business/_types";
import type { SignInDeviceType } from "../../sign-in/service/_types";

export interface SignupParams {
    username: string;
    nickname: string;
    password: string;
    eventCk: boolean;
    deviceType: typeof SignInDeviceType[number];
}

const SocialLogin = [ 'GOOGLE', 'APPLE' ] as const;
export type SocialLoginType = typeof SocialLogin[number];
export interface SocialSignUpParams {
    loginResponse: GoogleLoginResponse | AppleJwtLoginResponse | string;
    event: boolean;
    socialLoginType: SocialLoginType;
}