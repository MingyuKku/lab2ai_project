import { CommonListRes } from "hooks/faq/_types";

export interface TotalUserInfoRes {
    aosRegularOrderUser: number;
    aosSingleOrderUser: number;
    aosTotalPurchaseOrderUser: number;
    iosRegularOrderUser: number;
    iosSingleOrderUser: number;
    iosTotalPurchaseOrderUser: number;
    totalPurchaseOrderUser: number;
    totalRegularOrderUser: number;
    totalSingleOrderUser: number;
    totalUserCount: number;
}


export interface UserListRes extends CommonListRes {
    content: UserContent[];
}


interface UserContent {
    // aosReceiptProductId: string;
    basePlanId: string;
    birthday: string | null;
    email: string;
    gender: 'M' | 'F' | null;
    // genderText: '남' | '여' | null;
    // iosReceiptProductId: string | null;
    nickName: string;
    // platform: 'AOS' | 'IOS';
    platform: 'AOS' | 'iOS';
    platformType: string;
    productId: string;
    productOrderState: 'SINGLE' | 'REGULAR' | 'FUTURES_REGULAR' | 'FUTURES_SINGLE' | null;
    // productOrderStateKR: string;
    roundNumber: number;
    passProductKoName: string;
    // ticketEndDateTime: string;
    endDateTime: string;
    // ticketStartDateTime: string;
    startDateTime: string;
    statusType: string;
    statusTypeKo: string;
    // ticketState: string;
    type: string;
    // ticketStateKR: '-' | '유지';
    userId: string;
}