export interface DefaultRes {
    [key: string]: any;
    data: {
        message: string;
        result: any;
    };
    status?: number;
}


export interface ReturnSuccess {
    isSuccess: 'success' | 'fail'
}
