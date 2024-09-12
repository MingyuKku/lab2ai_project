import type { TradeType } from "../home/service/_types";

export interface HeaderLabel {
    titleLabel?: string;
    labelType?: 'model' | 'crypto';
    image?: string;
    tradeType?: TradeType;
}