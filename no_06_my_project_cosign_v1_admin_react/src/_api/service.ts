import { createAxios } from "_api";
import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ErrorRes } from "./_types";



/**
 *서비스 API 요청시 요청 헤더에 토큰 쿠키값을 넣어서 요청함
*/
const serviceRequest = (config: InternalAxiosRequestConfig) => {

    return config;
}

const serviceResponse = (res: AxiosResponse) => {
    return res;
}


const serviceResponseError = (err: AxiosError, instance: AxiosInstance) => {
    if (err.response) {
        const errRes = err.response.data as ErrorRes;

        if (errRes.error) {
            if (
                errRes.error.errorCode === "105" &&
                errRes.error.errorName === "USER_NOT_LOGIN"
            ) {
                window.location.href = '/';
            }
        }
    }
    

    return Promise.reject(err);   
}



export function serviceAxios() {
    const instance = createAxios();

    // 요청 인터셉터
    instance.interceptors.request.use(serviceRequest);

    // 응답 인터셉터
    instance.interceptors.response.use(serviceResponse, (err) => serviceResponseError(err, instance));

    return instance;
}