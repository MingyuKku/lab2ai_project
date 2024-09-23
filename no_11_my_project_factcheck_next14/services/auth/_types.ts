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

type UserAuthorities = {
    authority: string;
}

export type Authority = 'MEMBER' | 'ADMIN';

export type SignupParams = {
    username: string;
    name: string;
    email: string;
    authority: Authority;
}


export type TwofaParams = {
    number: string | number;
}