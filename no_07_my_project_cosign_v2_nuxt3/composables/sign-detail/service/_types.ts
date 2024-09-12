import type { NuxtError } from "#app";
import type { _AsyncData } from "~/composables/_api/_types";
import type { SignStatusType } from "~/composables/aimodel-detail/service/_types";
import type { CryptoCurrencyItem, EvaluateState, SimpleStatusType, TradeExchangeType, TradeFuturesPositionType, TradeType } from "~/composables/home/service/_types";

const AdEnum = {
    'BASIC_AD': '기본 광고',
    'REWARD_AD': '보상형 광고',
    'NONE': '광고 노출 없음',
} as const;

export type AdType = keyof typeof AdEnum;
export interface SignDetailInfo {
    adType: AdType;
    createdAt: string;
    cryptoId: number;
    cryptoFullCode: string;
    cutPrice: number;
    digitalAssetsCode: string;
    digitalAssetsId: number;
    digitalAssetsKoName: string;
    digitalAssetsEnName: string;
    endTime: string;
    endEarningTime: string;
    earningRate: number | null;
    evaluateState: keyof typeof EvaluateState;
    exchangeType: TradeExchangeType;
    leverage: number | null;
    modelId: string;
    modelName: string;
    pay: boolean;
    signStatusType: SignStatusType;
    startPrice: number;
    targetEarningRate: number;
    targetEarningRate2: number;
    targetEarningRate3: number;
    targetPrice: number;
    targetPrice2: number;
    targetPrice3: number;
    ticket: boolean;
    tradeType: TradeType;
    validateMin: number;
    positionType: TradeFuturesPositionType | null;
}


export class ClassSignDetailInfo {
    adType: AdType;
    createdAt: string;
    // createdAtText: string | null;
    createdAtText: string;
    cryptoId: number;
    cryptoFullCode: string;
    cutPrice: number;
    digitalAssetsCode: string;
    digitalAssetsId: number;
    digitalAssetsKoName: string;
    digitalAssetsEnName: string;
    endTime: string;
    endEarningTime: string;
    // endTimeText: string | null;
    endTimeText: string;
    earningRate: number | null;
    evaluateState: keyof typeof EvaluateState;
    exchangeType: TradeExchangeType;
    leverage: number | null;
    modelId: string;
    modelName: string;
    pay: boolean;
    signStatusType: SignStatusType;
    startPrice: number;
    targetEarningRate: number;
    targetEarningRate2: number;
    targetEarningRate3: number;
    targetPrice: number;
    targetPrice2: number;
    targetPrice3: number;
    ticket: boolean;
    tradeType: TradeType;
    validateMin: number;
    validateMinText: string;
    positionType: TradeFuturesPositionType | null;
    constructor(res: SignDetailInfo, dateFormat: Intl.DateTimeFormat) {
        this.adType = res.adType;
        this.createdAt = res.createdAt;
        // this.createdAtText = dateFormat.format(Date.parseUtcText(res.createdAt));
        const createdAtIso = Date.isoFormat(res.createdAt);
        this.createdAtText = dateFormat.format(new Date(createdAtIso));
        // this.createdAtText = Date.parseUtcToLocal(res.createdAt).format('MM월 DD일 HH:mm');
        // this.createdAtText = localeCreatedAtTime ? dateFormat.format(localeCreatedAtTime) : null;
        this.cryptoId = res.cryptoId;
        this.cryptoFullCode = res.cryptoFullCode;
        this.cutPrice = res.cutPrice;
        this.digitalAssetsCode = res.digitalAssetsCode;
        this.digitalAssetsId = res.digitalAssetsId;
        this.digitalAssetsKoName = res.digitalAssetsKoName;
        this.digitalAssetsEnName = res.digitalAssetsEnName;
        this.modelId = res.modelId;
        this.endTime = res.endTime;
        this.endEarningTime = res.endEarningTime;
        // this.endTimeText = dateFormat.format(Date.parseUtcToLocal(res.endTime));
        const endTimeIso = Date.isoFormat(res.endTime);
        this.endTimeText = dateFormat.format(new Date(endTimeIso));
        // this.endTimeText = Date.parseUtcToLocal(res.endTime).format('MM월 DD일 HH:mm');
        // this.endTimeText = localeEndTime ? dateFormat.format(localeEndTime) : null;
        this.earningRate = res.earningRate;
        this.evaluateState = res.evaluateState;
        this.exchangeType = res.exchangeType;
        this.leverage = res.leverage;
        this.modelName = res.modelName;
        this.pay = res.pay;
        this.signStatusType = res.signStatusType;
        this.startPrice = res.startPrice;
        this.targetEarningRate = res.targetEarningRate;
        this.targetEarningRate2 = res.targetEarningRate2;
        this.targetEarningRate3 = res.targetEarningRate3;
        this.targetPrice = res.targetPrice;
        this.targetPrice2 = res.targetPrice2;
        this.targetPrice3 = res.targetPrice3;
        this.ticket = res.ticket;
        this.tradeType = res.tradeType;
        this.validateMin = res.validateMin;
        this.validateMinText = res.validateMin.validateMinText();
        this.positionType = res.positionType;
    }
}


export interface RecentSignList {
    createdAt: string;
    cryptoId: number;
    cryptoFullCode: string;
    digitalAssetsId: number;
    digitalAssetsKoName: string;
    digitalAssetsEnName: string;
    earningRate: number | null;
    leverage: number | null;
    modelId: string;
    pay: boolean;
    positionType: TradeFuturesPositionType | null;
    signId: string;
    signStatusType: SignStatusType;
    subSeqId: number;
    targetEarningRate: number;
    ticket: boolean;
    tradeType: TradeType;
    updatedAt: string;
}



export interface AnotherModelSign {
    digitalAssetsCode: string;
    signItemResponse: AnotherModelSignItem[];
}

export interface AnotherModelSignItem {
    createdAt: string;
    cryptoCurrencyItem: CryptoCurrencyItem;
    modelId: string;
    modelName: string;
    pay: boolean;
    signId: string;
    simpleStatusType: SimpleStatusType;
    startPrice: number;
    subSeqId: number;
    targetEarningRate: number;
    targetPrice: number;
    ticket: boolean;
    tradeExchangeType: TradeExchangeType;
    tradeType: TradeType;
    updatedAt: string;
    evaluateState?: keyof typeof EvaluateState;
    earningRate?: number;
    leverage?: number;
    positionType?: TradeFuturesPositionType;
}

export class ClassAnotherModelSign {
    digitalAssetsCode: string;
    signItemResponse: ClassAnotherModelSignItem[];
    constructor(res: AnotherModelSign, numFormat: (value: string | number) => string) {
        this.digitalAssetsCode = res.digitalAssetsCode;
        this.signItemResponse = res.signItemResponse.map(item => new ClassAnotherModelSignItem(item, numFormat));
    }
}
export class ClassAnotherModelSignItem {
    createdAt: string;
    createdAtText: string;
    cryptoCurrencyItem: CryptoCurrencyItem;
    modelId: string;
    modelName: string;
    pay: boolean;
    signId: string;
    simpleStatusType: SimpleStatusType;
    startPrice: number;
    subSeqId: number;
    targetEarningRate: number;
    targetPrice: number;
    startPriceFormat: string;
    targetPriceFormat: string;
    questionCount: number;
    ticket: boolean;
    tradeExchangeType: TradeExchangeType;
    tradeType: TradeType;
    updatedAt: string;
    updatedAtText: string;
    evaluateState?: keyof typeof EvaluateState;
    earningRate?: number;
    leverage?: number;
    positionType?: TradeFuturesPositionType;
    positionTypeText?: string;
    constructor(res: AnotherModelSignItem, numFormat: (value: string | number) => string) {
        this.createdAt = res.createdAt;
        this.createdAtText = Date.parseUtcToLocal(res.createdAt).diffNow();
        this.cryptoCurrencyItem = res.cryptoCurrencyItem;
        this.modelId = res.modelId;
        this.modelName = res.modelName;
        this.pay = res.pay;
        this.signId = res.signId;
        this.simpleStatusType = res.simpleStatusType;
        this.startPrice = res.startPrice;
        this.subSeqId = res.subSeqId;
        this.targetEarningRate = res.targetEarningRate;
        this.targetPrice = res.targetPrice;
        this.startPriceFormat = numFormat(res.startPrice);
        this.targetPriceFormat = numFormat(res.targetPrice);
        this.questionCount = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
        this.ticket = res.ticket;
        this.tradeExchangeType = res.tradeExchangeType;
        this.tradeType = res.tradeType;
        this.updatedAt = res.updatedAt;
        this.updatedAtText = Date.parseUtcToLocal(res.updatedAt).diffNow();
        if (res.leverage) this.leverage = res.leverage;
        if (res.earningRate) this.earningRate = res.earningRate;
        if (res.positionType) this.positionType = res.positionType;
        if (res.positionType) this.positionTypeText = res.positionType === 'LONG' ? 'Long' : 'Short';
        if (res.evaluateState) this.evaluateState = res.evaluateState;
    }
}



export interface SignDetailContent {
    digitalAssetsRecentSuccessEarningCount: number;
    modelId: string;
    modelTopsEarningRateResponse: ModelTopsEarningRateResponse;
    targetModelSuccessEarningRate: number;
    totalModelSuccessEarningRate: number;
}


interface ModelTopsEarningRateResponse {
    digitalAssetsCode: string;
    modelEarningRateItems: ModelEarningRateItems[];
    modelName: string;
}

export interface ModelEarningRateItems {
    earningRate: number;
    pay: boolean;
    signStatusType: SignStatusType;
    subSeqId: number;
    ticket: boolean;
    tradeType: TradeType;
    validateMin: number;
}


export type SignProfilePromiseSettledResult = PromiseSettledResult<_AsyncData<ClassSignDetailInfo | null, NuxtError<unknown> | null>>;
export type RecentSignlistPromiseSettledResult = PromiseSettledResult<RecentSignList[] | null>;
export type AnotherModelSignPromiseSettledResult = PromiseSettledResult<ClassAnotherModelSign | null>;
export type SignDetailContentPromiseSettledResult = PromiseSettledResult<_AsyncData<SignDetailContent | null, NuxtError<unknown> | null>>