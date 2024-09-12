import type { TradeExchangeType } from "~/composables/home/service/_types";

const CurrencyCode = [ 'USDT', 'KRW' ] as const; 
const CopyTradingParamPeriod = [7, 30, 90] as const;

export type CurrencyCodeType = typeof CurrencyCode[number];
export type CopyTradingParamPeriodType = typeof CopyTradingParamPeriod[number];

export interface CopyTradingRankMeta {
    createdAt: string;
    exchange: TradeExchangeType;
    mdd: number;
    period: CopyTradingParamPeriodType;
    pnl: {
        currencyCode: CurrencyCodeType;
        price: number;
    };
    roi: number;
    roiChart: RoiChart;
    sharpRatio: number;
    winRate: number;
}

export interface RoiChart {
    chartPointList: ChartPointList[];
    topROI: number;
}

export interface ChartPointList {
    roi: number;
    timestamp: number;
}