import { CommonListRes } from "hooks/faq/_types";

const UpdateState = {
    NORMAL: '일반',
    ESSENTIAL_UPDATE: '강제',
    OFFER_UPDATE: '권장'
} as const;


export interface VersionContentRes extends CommonListRes {
    content: VersionContent[];
}

export type UpdateStateType = keyof typeof UpdateState;
export type UpdateStateTypeText = typeof UpdateState[keyof typeof UpdateState];


const PlatformArray = ["NON", "IOS", "AOS"] as const;
export type PlatformType = typeof PlatformArray['1' | '2'];
export type PlatformAllType = typeof PlatformArray[number];

export interface VersionContent {
    createdAt: string;
    memo: string | null;
    platformType: PlatformType;
    updateStateType: UpdateStateType;
    updateStateTypeKor: UpdateStateTypeText;
    vcId: number;
    version: string;
}


const UpdateObj = {
    'NORMAL': '일반',
    'OFFER_UPDATE': '권장',
    'ESSENTIAL_UPDATE': '강제',
} as const;

export type UpdateType = keyof typeof UpdateObj;