import type { CategoryLabelType, CategoryType } from "../service/_types";
import type { InputData, SignupInputerrors } from '~/composables/user/sign-up/business/_types';


export interface FaqCategoryItem {
    label: '전체' | CategoryLabelType;
    categoryType: 'all' | CategoryType;
}


export interface QnaRegistValue {
    content: InputData;
    files: QnaFiles;
}


export interface QnaFiles {
    attachFileList: File[];
    attachFileSize: number;
    tips?: string;
    errors?: SignupInputerrors;
}


export interface GetAgentInfo {
    platform: string;
    appVersion: string | null;
    osVersion: string;
    deviceModel: string | null;
    browser: string;
}