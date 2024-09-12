import type { _AsyncData } from "~/composables/_api/_types";

type TradeExchange = "UPBIT" | "BINANCE";
export declare type TradeType = "SPOT" | "FUTURES";
export declare type TradeExchangeType = "UPBIT" | "BINANCE" | "upbit" | "binance";
export declare type TradeFuturesPositionType = "LONG" | "SHORT";

export const EvaluateState = {
    buy_wait: '매수 대기',
    sell_fail: '진입 성공, 목표가 도달x, 종료',
    sell_wait: '진입 성공 ~ 목표가1 대기, 종료 전',
    sell_wait2: '목표가1 진입 ~ 목표가2 대기, 종료 전',
    sell_wait3: '목표가2 진입 ~ 목표가3 대기, 종료 전',
    sell_success: '목표가1 진입 성공, 종료',
    sell_success2: '목표가2 진입 성공, 종료',
    sell_success3: '목표가3 ~ , 종료',
    buy_fail: '진입 실패',
    cut: '손절',
} as const;
// 비로그인이거나 티켓이 없는 경우 -> 블러처리해야 함으로 TradeStatusTypeExp값을 반환되지 않음

// export declare type TradeStatusType = keyof typeof TradeStatusTypeExp;
// export declare type EvaluateStateType = keyof typeof EvaluateState;

export type SignIdList = string[];

export const SignListSortTypeParam = {
    updated: 'updated',
    created: 'created',
    earningRate: 'earningRate',
} as const;

export const TradeTypeParam = {
    all: 'all',
    spot: 'spot',
    futures: 'futures',
} as const;

export const SignStatusTypeParam = {
    all: 'all',
    wait: 'wait',
    processing: 'processing',
    end: 'end',
} as const;

export type SignListSortTypeParamType = keyof typeof SignListSortTypeParam;
export type TradeTypeParamType = keyof typeof TradeTypeParam;
export type SignStatusTypeParamType= keyof typeof SignStatusTypeParam;
export type DigitalAssetsIdParamType = number; // 0은 디폴트 => 전체
export interface SignIdListParams {
    sortType: SignListSortTypeParamType;
    tradeType: TradeTypeParamType;
    signStatusType: SignStatusTypeParamType;
    digitalAssetsId: DigitalAssetsIdParamType;
}

export type SignIdListParamsKeys = keyof SignIdListParams;

export interface CryptoCurrencyItem {
    cryptoCurrencyId: number;
    cryptoFullCode: string;
    digitalAssetsCode: string;
    digitalAssetsEnName: string;
    digitalAssetsId: number;
    digitalAssetsKoName: string;
}


export type SimpleStatusType = 'start' | 'end';

export interface HomeSignItem extends HomeSignItemOption {
    signId: string;
    subSeqId: number;
    cryptoCurrencyItem: CryptoCurrencyItem;
    modelId: string;
    modelName: string;
    pay: boolean; // true -> 유료싸인 / false -> 무료싸인
    ticket: boolean;
    tradeExchangeType: TradeExchangeType;
    simpleStatusType: SimpleStatusType;
    tradeType: TradeType;
    createdAt: string;
    updatedAt: string;
    startPrice: number;
    targetPrice: number;
    targetEarningRate: number;
}

export interface HomeSignItemOption {
    evaluateState?: keyof typeof EvaluateState;
    leverage?: number;
    positionType?: TradeFuturesPositionType;
    earningRate?: number;
}


export class ClassHomeSignItem {
    signId: string;
    subSeqId: number;
    cryptoCurrencyItem: CryptoCurrencyItem;
    modelId: string;
    modelName: string;
    tradeType: TradeType;
    pay: boolean;
    createdAt: string;
    updatedAt: string;
    createdAtText: string;
    updatedAtText: string;
    ticket: boolean;
    tradeExchangeType: TradeExchangeType;
    simpleStatusType: SimpleStatusType;
    startPrice: number;
    targetPrice: number;
    startPriceFormat: string;
    targetPriceFormat: string;
    targetEarningRate: number;
    questionCount: number;
    evaluateState?: keyof typeof EvaluateState;;
    leverage?: number;
    earningRate?: number;
    positionType?: TradeFuturesPositionType;
    positionTypeText?: string;

    constructor(res: HomeSignItem, numFormat: (value: string | number) => string) {
        this.signId = res.signId;
        this.subSeqId = res.subSeqId;
        this.cryptoCurrencyItem = res.cryptoCurrencyItem;
        this.modelId = res.modelId;
        this.modelName = res.modelName;
        this.tradeType = res.tradeType;
        this.pay = res.pay;
        this.createdAt = res.createdAt;
        this.updatedAt = res.updatedAt;
        this.createdAtText = Date.parseUtcToLocal(res.createdAt).diffNow();
        this.updatedAtText = Date.parseUtcToLocal(res.updatedAt).diffNow();
        this.ticket = res.ticket;
        this.tradeExchangeType = res.tradeExchangeType;
        this.simpleStatusType = res.simpleStatusType;
        this.startPrice = res.startPrice;
        this.targetPrice = res.targetPrice;
        this.targetEarningRate = res.targetEarningRate;
        this.startPriceFormat = numFormat(res.startPrice);
        this.targetPriceFormat = numFormat(res.targetPrice);
        this.questionCount = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
        if (res.leverage) this.leverage = res.leverage;
        if (res.earningRate) this.earningRate = res.earningRate;
        if (res.positionType) this.positionType = res.positionType;
        if (res.positionType) this.positionTypeText = res.positionType === 'LONG' ? 'Long' : 'Short';
        if (res.evaluateState) this.evaluateState = res.evaluateState;
    }
}



export interface CryptoFilterItem {
    digitalAssetsCode: string;
    digitalAssetsId: number;
    createdAt: string;
    exchangeId: number;
    exchangeType: TradeExchange;
}


export interface CryptoListReactiveData {
    total: CryptoFilterItem[];
    view: CryptoFilterItem[];
}