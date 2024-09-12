import { useFilterMiddleware } from "~/composables/_app/useFilterMiddleware";
import type { FilterCookieKeyValue } from "~/composables/useCookie/_types";


export default defineNuxtRouteMiddleware((to, from) => {

    const { getIndexQueryParams, getAimodelQueryParams, getModelidQueryParams, setIndex, setAimodel, setModelid } = useFilterMiddleware();

    
    let queryParams: FilterCookieKeyValue<unknown>[] = [];
    if (to.name === 'index') {
        queryParams = getIndexQueryParams(to);
    }
    // if (to.name === 'aimodel') {
    //     queryParams = getAimodelQueryParams(to);
    // }
    // if (to.name === 'modelid') {
    //     queryParams = getModelidQueryParams(to);
    // }
    
    if (queryParams.length > 0) {
        // 저장된 쿠키 필터값(allFilterCookies)이 url쿼리 파라미터(queryNames)에 존재하지 않을때 -> 해당 쿠키 필터값을 url 쿼리 파라미터로 넣고 페이지 리다이렉트
        let url = to.fullPath;
        queryParams.forEach((obj) => {
            const prefix = url.includes('?') ? '&' : '?';
            
            url = `${url}${prefix}${obj.key}=${obj.value}`;
        })
        
        
        return navigateTo(url, { replace: true });

    } else {
        // url 쿼리 파라미터에 있는 값이 쿠키에 저장되지 않은 경우 -> 쿠키에 저장시킴
        
        if (to.name === 'index') {
            setIndex(to);
        }
        // if (to.name === 'aimodel') {
        //     setAimodel(to);
        // }
        // if (to.name === 'modelid') {
        //     setModelid(to);
        // }
    }
})