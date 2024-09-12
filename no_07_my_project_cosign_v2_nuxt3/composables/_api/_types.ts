
import type { NitroFetchRequest } from 'nitropack';
import type { Options } from '~/plugins/api';

export interface BasicRes {
    [key: string]: any;
    status: number;
    data: any;
    error?: ErrorCode;
}

export interface AuthRes {
    [key: string]: any;
    status: number;
    data: {
        [key:string]: any;
        refresh: boolean;
    };
    error?: ErrorCode;
}


export interface ErrorCode {
    errorCode: string;
    errorName: string;
    message: string;
}

export type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error';
export interface AsyncDataExecuteOptions {
    _initial?: boolean;
    /**
     * Force a refresh, even if there is already a pending request. Previous requests will
     * not be cancelled, but their result will not affect the data/pending state - and any
     * previously awaited promises will not resolve until this new request resolves.
     *
     * Instead of using `boolean` values, use `cancel` for `true` and `defer` for `false`.
     * Boolean values will be removed in a future release.
     */
    dedupe?: boolean | 'cancel' | 'defer';
}


export interface _AsyncData<DataT, ErrorT> {
    data: Ref<DataT>;
    pending: Ref<boolean>;
    refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>;
    execute: (opts?: AsyncDataExecuteOptions) => Promise<void>;
    error: Ref<ErrorT | null>;
    status: Ref<AsyncDataRequestStatus>;
}


export type intercepterContext = FetchContext & { response: FetchResponse<NitroFetchRequest>};

export interface FetchContext<T = any, R extends ResponseType = ResponseType> {
    request: RequestInfo;
    options: Options;
    response?: FetchResponse<T>;
    error?: Error;
}
export interface FetchResponse<T> extends Response {
    _data?: T;
}