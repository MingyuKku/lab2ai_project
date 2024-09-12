export interface UpdateNicknameParams {
    nickname: any;
    eventCk: boolean;
    optionalUsername?: string;
}

export interface UpdatePasswordParams {
    oldPwd: string;
    newPwd: string;
}

export interface MypageUserInfo {
    email: string | null;
    eventCk: boolean;
    id: string;
    nickName: string;
    passwordNull: boolean;
}

export interface ReturnSuccess {
    message: 'success' | 'fail';
}