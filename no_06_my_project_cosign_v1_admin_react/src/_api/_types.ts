export interface DefaultRes {
    [key: string]: any;
    data: any;
    status?: number;
}


export interface ReturnSuccess {
    isSuccess: 'success' | 'fail'
}


export interface ErrorRes {
    [key: string]: any;
    data: any;
    error?: ErrorInfo;
}

export type ErrorInfo = {
    errorCode: string;
    errorName: string;
    message: string;
} 