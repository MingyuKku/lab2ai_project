export interface DefaultRes {
    [key: string]: any;
    data: any;
    status?: number;
}


export interface ReturnSuccess {
    isSuccess: 'success' | 'fail'
}
