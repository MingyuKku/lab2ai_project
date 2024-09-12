import { CommonListRes } from "hooks/faq/_types";

const MemberFetchPathParam = ["email", "nickname", "name", "cellphone"] as const;

export type MemberFetchPathParamType = typeof MemberFetchPathParam[number];
export interface MemberListRes extends CommonListRes {
    content: MemberContent[];
}

export interface MemberContent {
    cellphoneNo: string | null;
    createdAt: string;
    email: string | null;
    name: string | null;
    nickName: string | null;
    userId: string;
}

export type TelecomType = '01' | '02' | '03' | '04' | '05' | '06';

export interface MemberDetailRes {
    birthday: string | null;
    cellphoneNo: string | null;
    certTimestamp: string | null;
    ci: string | null;
    createdAt: string;
    di: string | null;
    email: string | null;
    eventCk: boolean;
    foreignerCK: boolean;
    gender: string | null;
    infoChangeTimestamp: string | null;
    name: string | null;
    nickName: string;
    oauthAppleId: string | null;
    oauthGoogleId: string | null;
    passwordChangeTimestamp: string | null;
    recentLoginIp: string | null;
    recentLoginTimestamp: string | null;
    telecom_type: TelecomType | null;
    updatedAt: string;
    uuid: string;
}


export interface MemberUpdateSubmitParams {
    uuid?: string;
    email?: string;
    nickName?: string;
    eventCk?: string | boolean;
}