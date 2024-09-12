import type { SignList } from "~/composables/aimodel-detail/service/_types";
import type { SignListSortTypeParamType, SignStatusTypeParamType, TradeExchangeType, TradeTypeParamType } from "~/composables/home/service/_types";

export interface CryptoDetailSignListParams {
    tradeType: TradeTypeParamType;
    signStatusType: SignStatusTypeParamType;
    sortType: SignListSortTypeParamType;
}


export interface SignListResponse {
    isLast: boolean;
    signList: CryptoSignList[];
}

export interface CryptoSignList extends SignList {
    modelId: string;
}


export interface CryptoDetailInfo {
    cryptoCurrencyItem: CryptoCurrencyItem[];
    exchange: TradeExchangeType;
}


export interface CryptoCurrencyItem {
    cryptoCurrencyId: number;
    cryptoFullCode: string;
    digitalAssetsCode: string;
    digitalAssetsEnName: string;
    digitalAssetsId: number;
    digitalAssetsKoName: string;
}

export interface ICryptoTimelineWrap {
    cryptoTimeline: ICryptoTimeline;
}

export interface ICryptoTimeline {
    cryptoTimelineItems: ICryptoTimelineItem[];
    isLast: boolean;
}

export interface ICryptoTimelineItem {
    id: number;
    timelineId: number;
    mainCategory: ICryptoTimelineMainCategory;
    subCategory: ICryptoTimelineSubCategory;
    cryptoCurrencyId: number;
    displayFlag: boolean;
    description: string;
    createdAt: string;
}

export type ICryptoTimelineMainCategory = 
    "MARKET_DETECT" |
    "PATTERN_SCAN" | 
    "SIGN" | 
    "EDITOR"
    ;

export type ICryptoTimelineSubCategory = 
    "HIGH_LOW_PRICES_PERIOD" | // 기간 내 최고/최저가
    "VOLUME_PEAK_PERIOD" | // 거래량 기간 내 최고
    "PRICE_CHANGE_RATE_PEAK_PERIOD" | // 가격 변화율 기간 내 최고/최저
    "VOLUME_CHANGE_RATE_PEAK_PERIOD" | // 거래량 변화율 기간 내 최고
    "CHART_PATTERN_RECOGNITION_COIN" | // 차트 패턴 포착
    "HIGH_YIELD_SIGNALS" | // 수익률 높은 SIGN
    "ADMIN_MANUAL_INPUT" // Admin 수동 입력
    ;

export interface ICryptoTimelinePatternScan {
    id: number;
    patternScanId: number;
    startPointTime: number;
    endPointTime: number;
}

export interface ICryptoTimelineSign {
    id: number;
    mentorPageId: string;
    signSubSeqId: number;
    modelId: string;
}

export interface ICryptoTimelineMarket {
    id: number;
    detectDateTime: string;
}

export interface ICryptoTimelineDetail {
    patternScanTimelineItem?: ICryptoTimelinePatternScan;
    signTimelineItem?: ICryptoTimelineSign;
    marketDetectTimelineItem?: ICryptoTimelineMarket;
}