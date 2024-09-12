import type { ModelListParams } from "../service/_types";
import type { AsyncDataExecuteOptions } from "~/composables/_api/_types";
import type { FilterReactiveType } from "~/composables/home/business/_types";

export interface ChangeSelectedFilterFucParams<T> {
    index: number;
    filterReactive: FilterReactiveType<T>;
    // setCookie: (value: any) => void;
    refresh: (opts?: AsyncDataExecuteOptions | undefined) => Promise<void>;
    changeQueryParam: Partial<ModelListParams>;
}