import type { SelectedItems } from "~/components/_common/parts/_types";
import type { HomeSignItem, SignIdList, SignIdListParams, TradeExchangeType } from "../service/_types";
import type { AsyncDataExecuteOptions } from "~/composables/_api/_types";

export type UpbitTickerChangeType = 'RISE' | 'EVEN' | 'FALL';

export interface ClientSignItemData {
    showFlag: boolean;
    // virtualHeight: number | null;
    tradePrice: number | string | null;
    changePrice: number | string | null;
    change: UpbitTickerChangeType | null;
}


export interface UpbitSocketMessageItem {
    code: string;
    tradePrice: number | string | null;
    changePrice: number | string | null;
    change: UpbitTickerChangeType | null;
}


export interface SocketUiData {
    tradePrice: number | string | null;
    changePrice: number | string | null;
    change: UpbitTickerChangeType | null;
}

export interface UseIntersectionObserverType {
    // item: HomeSignItem;
    digitalAssetsCode: string;
    type: TradeExchangeType;
    isLastEl: boolean;
    signItemListRefresh?: () => Promise<void>;
}

export interface FilterReactiveType<T> {
    activeIndex: number;
    items: SelectedItems<T>[];
}


export interface ChangeSelectedFilterFucParams<T> {
    index: number;
    filterReactive: FilterReactiveType<T>;
    setCookie: (value: any) => void;
    refresh: (opts?: AsyncDataExecuteOptions | undefined) => Promise<void>;
    changeQueryParam: Partial<SignIdListParams>
}

export interface HomeSignIdList {
    all: SignIdList;
    view: SignIdList;
    startIndex: number;
    viewCount: number;
    lastSignId: string | null;
}
