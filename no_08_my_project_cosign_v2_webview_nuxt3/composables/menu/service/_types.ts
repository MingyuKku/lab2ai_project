const PassStatus = {
    'ACTIVE': '활성',
    'CANCEL': '취소',
    'HOLD': '일시 정지',
    'EXPIRE': '만료',
    'IN_GRACE_PERIOD': '유예 기간',
} as const;

const TicketType = {
    'REGULAR_TICKET': '구독',
    'ONE_TIME_PURCHASE': '단건',
} as const;

export type PassStatusType = keyof typeof PassStatus;
export type PassType = keyof typeof TicketType;


export interface UserInfo {
    nextPurchaseDateTime: string | null;
    nickname: string | null;
    passPlatformType: string | null;
    passStatusType: PassStatusType | null;
    passType: PassType | null;
    remainingDateTime: number | null;
    ticketDisplayKoName: string | null;
    username: string | null;
}