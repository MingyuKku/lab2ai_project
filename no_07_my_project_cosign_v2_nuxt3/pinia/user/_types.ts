
export interface AuthState {
    isUserSignedIn: boolean;
    redirectRoutePage: string | null; // 로그인 성공 후 리다이렉트 시킬 라우트 path
}