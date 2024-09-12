import type { AsyncDataExecuteOptions } from "~/composables/_api/_types";
import type { FilterReactiveType } from "~/composables/home/business/_types";
import type { ModelDetailSignlistParams } from "../service/_types";
import type { TradeType } from "~/composables/home/service/_types";

export interface ChangeSelectedFilterFucParams<T> {
    index: number;
    filterReactive: FilterReactiveType<T>;
    setCookie: (value: any) => void;
    refetch: (opts?: AsyncDataExecuteOptions | undefined) => Promise<void>;
    changeQueryParam: Partial<ModelDetailSignlistParams>
}


export interface HeaderDataType {
    modelName: string | null;
    tradeType: TradeType | null;
}