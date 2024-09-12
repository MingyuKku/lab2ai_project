import { CommonListRes } from "hooks/faq/_types";
import { FileData } from "hooks/notice/_types";

export interface QnaListRes extends CommonListRes {
    content: QnaListItem[];
}

interface QnaListItem {
    answerCk: boolean;
    content: string;
    createdAt: string;
    email: string;
    id: number;
    memberDivision: '비회원' | '회원';
    updatedAt: string;
}


export interface QnaDetailRes {
    answerCk: boolean;
    answerInquiryItem: null | AnswerInquiryData;
    appVersion: string | null;
    browserType: string | null;
    content: string;
    createdAt: string;
    deleteCk: boolean;
    deviceModel: string | null;
    email: string;
    id: number;
    memberDivision: string;
    osVersionType: string | null;
    platformType: string;
    siteInquiryFile: FileData[];
    updatedAt: string;
}

export interface AnswerInquiryData {
    answerAddTime: string;
    content: string;
    createdAt: string;
    id: number;
    sendEmailCk: boolean;
    updatedAt: string;
}


export interface GetDeviceInfoParam {
    platformType: string;
    appVersion: string | null;
    deviceModel: string | null;
    osVersionType: string | null;
    browserType: string | null;
}


export type QnaRegistParams = {
    inquiryId: string | number;
    email: string;
    member: string;
    userContent: string;
    userAddDateTime: string;
    content: string;
    addDateTime: string;
}

export type QnaRegistContext = Pick<
    QnaRegistParams,
    'email' | 'member' | 'userContent' | 'userAddDateTime'
>
