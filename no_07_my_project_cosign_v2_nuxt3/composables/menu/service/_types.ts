const PassStatus = {
    'ACTIVE': '활성',
    'CANCEL': '취소',
    'HOLD': '일시 정지',
    'EXPIRE': '만료',
    'IN_GRACE_PERIOD': '유예 기간',
} as const;

const TicketType = {
    'SUBSCRIPTIONS': '구독',
    'ONE_TIME_PURCHASE': '단건',
} as const;

export type PassStatusType = keyof typeof PassStatus;
export type PassType = keyof typeof TicketType;


export interface UserInfo {
    username: string | null;
    nickname: string | null;
    passStatusType: PassStatusType | null;
    ticketDisplayKoName: string | null;
    passType: PassType | null;
    passPlatformType: string | null;
    nextPurchaseDateTime: string | null;
    remainingDateTime: number | null;
}