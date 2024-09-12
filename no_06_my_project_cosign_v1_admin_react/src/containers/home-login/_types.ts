export type LoginParams = {
    username: string;
    password: string;
}


export interface LoginUserRes {
    adminCk: boolean;
    authorities: UserAuthorities[];
    token: string;
    totalAlarmCount: number;
    username: string;
}

interface UserAuthorities {
    authority: string;
}