import type { SignListSortTypeParamType, SignStatusTypeParamType, TradeFuturesPositionType, TradeType } from "~/composables/home/service/_types";

export type SignStatusType = "WAIT" | "START" | "PROCESSING" | "END";
export type BlurFuturesValue = 'blur';


export interface ModelDetailSignListParams {
    signStatusType: SignStatusTypeParamType;
    sortType: SignListSortTypeParamType;
}

export type ModelDetailSignListParamsKeys = keyof ModelDetailSignListParams;

export interface ModelProfileDetail {
    bestEarningRate: number;
    bestSuccessRate: number;
    description: string;
    modelId: string;
    modelName: string;
    modelType: TradeType;
    recentEarningRate: number;
    recentSuccessRate: number;
    tag: string | null;
}

// export class ClassModelProfileDetail {
//     bestEarningRate: number;
//     bestSuccessRate: number;
//     description: string;
//     modelId: string;
//     modelName: string;
//     modelType: TradeType;
//     recentEarningRate: number;
//     recentSuccessRate: number;
//     tag: string | null;
//     tags: string[] | null;
//     constructor(res: ModelProfileDetail) {
//         this.bestEarningRate = res.bestEarningRate;
//         this.bestSuccessRate = res.bestSuccessRate;
//         this.description = res.description;
//         this.modelId = res.modelId;
//         this.modelName = res.modelName;
//         this.modelType = res.modelType;
//         this.recentEarningRate = res.recentEarningRate;
//         this.recentSuccessRate = res.recentSuccessRate;
//         this.tag = res.tag;
//         this.tags = res.tag ? res.tag.split('|') : null;
//     }
// }

export interface RecentBestSignItems {
    cryptoCurrencyId: number;
    cryptoFullCode: string;
    digitalAssetsId: number;
    digitalAssetsCode: string;
    digitalAssetsKoName: string;
    digitalAssetsEnName: string;
    earningRate: number;
    subSeqId: number;
    updatedAt: string;
    pay: boolean;
    signStatusType: SignStatusType;
    ticket: boolean;
    tradeType: TradeType;
}



export interface ModelDetailSignlistParams {
    signStatusType: SignStatusTypeParamType;
    sortType?: SignListSortTypeParamType;
}

export type ModelDetailSignlistParamsKeys = keyof ModelDetailSignlistParams;


export interface SignListRes {
    isLast: boolean;
    signList: SignList[];
}

export interface SignList {
    createdAt: string;
    updatedAt: string;
    cryptoId: number;
    cryptoFullCode: string;
    digitalAssetsId: number;
    digitalAssetsKoName: string;
    digitalAssetsEnName: string;
    pay: boolean;
    signId: string;
    signStatusType: SignStatusType;
    subSeqId: number;
    targetEarningRate: number;
    ticket: boolean;
    tradeType: TradeType;
    earningRate: number | null;
    positionType: TradeFuturesPositionType | null;
    leverage: string | null;
}