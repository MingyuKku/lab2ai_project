export interface CheckUserInfo {
    nickName: string | null;
    refresh: boolean;
}


export interface ReturnDecodeType {
    dt: null;
    exp: number;
    iat: number;
    id: string;
    iss: string;
    social: string;
}