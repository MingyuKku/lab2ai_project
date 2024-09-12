export interface GoogleLoginResponse {
    exp: any;
    aud: any;
    sub: any;
    azp: any;
    locale: any;
    family_name: any;
    given_name: any;
    picture: any;
    name: any;
    email: string;
    email_verified: any;
}


export interface AppleJwtLoginResponse {
    nonce_supported: boolean;
    auth_time: number;
    email_verified: string;
    is_private_email: string;
    email?: string;
    sub: string;
    iat: number;
    exp: number;
    aud: string;
    iss: string;
}


export interface TokenInfoResponse {
    aud: string;
    exp: number;
    sub: string;
    azp: string;
    [key: string]: any; // 추가적인 필드에 대해 유연하게 대응
}

export interface GoogleEndpointParams {
    client_id: string;
    redirect_uri: string;
    response_type: string;
    scope: string;
    include_granted_scopes: string;
    state: string;
    [key: string]: string; // 인덱스 서명 추가
}