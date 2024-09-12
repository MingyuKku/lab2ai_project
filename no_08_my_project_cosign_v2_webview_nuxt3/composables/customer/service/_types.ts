import type { GetAgentInfo } from "../business/_types";

const Categorys = {
    'SERVICE_USAGE': '서비스이용',
    'ACCOUNT': '계정',
    'PAYMENT': '결제',
    'PARTNERSHIP': '제휴',
    'NOTIFICATION': '공지',
    'GUIDE': '안내',
} as const;

export type CategoryType = keyof typeof Categorys;
export type CategoryLabelType = typeof Categorys[keyof typeof Categorys];


export interface QuestionList extends PageableCommon {
    content: FaqListContent[];
    totalElements: number;
    totalPages: number;
}

interface FaqListContent {
    categoryType: CategoryType;
    content: string;
    count: number;
    createdAt: string;
    deleteCk: boolean;
    id: number;
    title: string;
    updatedAt: string;
}

interface PageableCommon {
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements:number;
    pageable: Pageable;
    size: number;
    sort: Sort;
}

interface Pageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: Sort;
    unpaged: boolean;
}

interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}


export interface FormDataParams {
    email: string;
    content: string;
    attachFileList: File[];
    getAgentInfo: GetAgentInfo;
}



export interface NoticeList extends PageableCommon {
    content: NoticeContent[];
    totalElements: number;
    totalPages: number;
}


interface NoticeContent {
    createdAt: string;
    id: number;
    title: string;
    updatedAt: string;
}


export interface NoticeDetail {
    content:string;
    createdAt:string;
    deleteCk:boolean;
    id:number;
    noticeFileData:[];
    title:string;
    updatedAt:string;
}



export interface QnaList extends PageableCommon {
    content: QnaListContent[];
    totalElements: number;
    totalPages: number;
}

export interface QnaListContent {
    answerCk:boolean;
    answerInquiryData:null | AnswerInquiryData;
    content:string;
    createdAt:string;
    email:string;
    id:number;
    memberDivision: '회원' | '비회원' | null;
    siteInquiryFile:SiteInquiryFile[];
    updatedAt:string;
}


export interface AnswerInquiryData {
    answerAddTime:string;
    content:string;
    createdAt:string;
    id:number;
    sendEmailCk:boolean;
    updatedAt:string;
}

export interface SiteInquiryFile {
    createdAt:string;
    deleteCk:boolean;
    fileLink:string;
    fileName:string;
    id:number;
    number:number;
    updatedAt:string;
}