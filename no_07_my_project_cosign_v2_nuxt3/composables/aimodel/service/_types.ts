import type { RecentBestSignItems } from "~/composables/aimodel-detail/service/_types";
import type { TradeType, TradeTypeParamType } from "~/composables/home/service/_types";

export type AiModelTradeTypeOption = 'all' | 'futures' | 'spot';

export const ModelListSortTypeParam = {
    hitRate: 'hitRate',
    earningRate: 'earningRate',
} as const;

export const StatPeriodTypeParam = {
    total: 'total',
    recentDays: 'recentDays',
} as const;

export type ModelListSortTypeParamType = keyof typeof ModelListSortTypeParam;
export type StatPeriodTypeParamType= keyof typeof StatPeriodTypeParam;
export interface ModelListParams {
    sortType: ModelListSortTypeParamType;
    tradeType: TradeTypeParamType;
    statPeriodType: StatPeriodTypeParamType;
}

export type ModelListParamsKeys = keyof ModelListParams;



export interface PredictionModelItem {
    bestEarningRateSignId: number;
    maxEarningRate: number;
    mentorPageId: string;
    modelId: string;
    modelKoDisplayName: string;
    modelKoName: string;
    modelType: TradeType;
    recentBestSignItems: RecentBestSignItems[];
    signOnCount: number;
    successRate: number;
}


export interface BestPredictionModel {
    modelId: string;
    modelKoName: string;
    modelType: TradeType;
    successRate: number;
}












export interface AiModelRes {
    dailyAverageSign:number;
    maxEarningRate:number;
    mentorDescription:string;
    mentorPageId:string;
    mentorId:string;
    mentorProfileImage:string;
    mentorTitle:string;
    successRate:number;
    mentorType: AiModelType;
    signOnLists:SignOnResItem[];
}

type AiModelType = "SPOT" | "FUTURES";

interface SignOnResItem {
    crypto:Crypto;
    mentorId:string;
    subSeqId:number;
    pay:boolean;
}


export interface Crypto {
    cryptoFullCode: string;
    cryptoId: number;
    digitalAssetsCode: string;
    digitalAssetsId: number;
    digitalAssetsKrName: string;
    imageURL: string;
}