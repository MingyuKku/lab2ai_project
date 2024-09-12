export interface UpdatedData {
    dateTime: string | null;
    signIds: string[];
}

export interface EarningRateData {
    subSeqId: number | null;
    earningRate: number | null;
    signIds: string[];
    isBuyFail: boolean;
}