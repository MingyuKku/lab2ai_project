import { useCommon } from "../_app/useCommon";
import type { ReturnDecodeType } from "./_types";

export const jwtDecode = (token: string): ReturnDecodeType => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


/**
 * 반환 값이 양수인 경우 -> exp시간이 지났음(만료)
 * 반환 값이 음수인 경우 -> exp시간이 남음(유효함)
 */
const remainTimejwt = (exp: number, interval: 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second') => {
    const expTime = exp * 1000;

    const currentTime = new Date().getTime();

    const difference = expTime - currentTime;

    let unit = 0;

    if (interval === 'day') {
        unit = (1000 * 60 * 60 * 24);
    }
    if (interval === 'hour') {
        unit = (1000 * 60 * 60);
    }
    if (interval === 'minute') {
        unit = (1000 * 60);
    }
    if (interval === 'second') {
        unit = 1000;
    }

    return difference / unit;
}


/**
 * 토큰을 재발급 받아야 하는 경우 true 반환
 */
export const isRefreshTokenCondition = (token: string) => {
    const { isDev } = useCommon();

    if (isDev()) {
        // 토큰 유효시간 5분

        const decode = jwtDecode(token);
        // const differenceUnit = remainTimejwt(decode.exp, 'minute');
        const differenceUnit = remainTimejwt(decode.exp, 'second');

        // const remain = 3; // 3분 미만으로 남았을 때 리프레시 시킴
        const remain = 10; // 10초 미만으로 남았을 때 리프레시 시킴
        if (differenceUnit < remain) {
            return true;
        } else {
            return false;
        }
        
    } else { // 상용 환경
        // 토큰 유효시간 30일
        const decode = jwtDecode(token);
        const differenceUnit = remainTimejwt(decode.exp, 'day');

        const remain = 7; // 7일 미만으로 남았을 때 리프레시 시킴
        if (differenceUnit < remain) {
            return true;
        } else {
            return false;
        }
    }
}
