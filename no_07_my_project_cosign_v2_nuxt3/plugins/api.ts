import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack';
import { useFetchAuthInterceptor } from '~/composables/_api/useFetchAuthInterceptor';
import { useFetchInterceptor } from '~/composables/_api/useFetchInterceptor';

export type Options = NitroFetchOptions<NitroFetchRequest, "get" | "head" | "patch" | "post" | "put" | "delete" | "connect" | "options" | "trace">;


export default defineNuxtPlugin(() => {

    const config = useRuntimeConfig();
    const { onRequestService, onResponseServiceError, languageHeader } = useFetchInterceptor();
    const { authorizationHeader, onResponseAuthError } = useFetchAuthInterceptor();


    /**
     * 유저 권한 관련 api(sign-in, sign-out, refresh)
     */
    const authApiFetch = <ResT = void>(url: string, opts:Options = {method:'GET'}) => {
        const option: Options = {
            headers: {
                ...authorizationHeader(),
            },
            onResponseError: onResponseAuthError,
            ...opts,
        }

        return $fetch<ResT>(`${config.public.AUTH_API_URL}/${url}`, option);
    }


    const serviceSignApiFetch = <ResT = void>(url: string, opts:Options = {method:'GET'}) => {
        let option: Options = {
            headers: {
                ...authorizationHeader(),
            },
            onRequest: onRequestService,
            onResponseError: onResponseServiceError,
            ...opts,
        }

        return $fetch<ResT>(`${config.public.API_URL}/${url}`, option);
    }


    const serviceContentApiFetch = <ResT = void>(url: string, opts:Options = {method:'GET'}) => {
        let option: Options = {
            headers: {
                ...authorizationHeader(),
                ...languageHeader(),
            },
            onRequest: onRequestService,
            onResponseError: onResponseServiceError,
            ...opts,
        }

        return $fetch<ResT>(`${config.public.CONTENT_API_URL}/${url}`, option);
    }


    const serviceChatApiFetch = <ResT = void>(url: string, opts:Options = {method:'GET'}) => {
        let option: Options = {
            headers: {
                ...authorizationHeader(),
            },
            onRequest: onRequestService,
            onResponseError: onResponseServiceError,
            ...opts,
        }

        return $fetch<ResT>(`${config.public.CHAT_API_URL}/${url}`, option);
    }


    const externalApiFetch = <ResT = void>(url: string, opts:Options = {method:'GET'}) => {
        return $fetch<ResT>(`${url}`, opts);
    }



    const testApiFetch = <ResT = void>(url: string, opts:Options = {method:'GET'}) => {
        let option: Options = {
            headers: {
                ...authorizationHeader(),
                ...languageHeader(),
            },
            onRequest: onRequestService,
            onResponseError: onResponseServiceError,
            ...opts,
        }

        return $fetch<ResT>(`${url}`, option);
    }


    return {
        provide: {
            authApiFetch,
            serviceSignApiFetch,
            serviceContentApiFetch,
            serviceChatApiFetch,
            externalApiFetch,
            testApiFetch,
        }
    }
})