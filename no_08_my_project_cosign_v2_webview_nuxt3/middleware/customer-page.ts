import type { LocationQueryRaw } from 'vue-router';
import { routeQueryPage, routeQueryCategory } from '~/composables/customer/business/constant';

export default defineNuxtRouteMiddleware((to, from) => {

    const { path, query } = to;
    const page = query[routeQueryPage];
    
    let addQuery: LocationQueryRaw | null = null;
    // let redirectUrl = '';

    // 라우터 쿼리에 페이지번호가 없는 경우 디폴트로 '1' 리다이렉트
    if (!page) {

        // redirectUrl = `${fullPath}/?${routeQueryPage}=${1}`;
        addQuery = {
            [routeQueryPage]: 1
        }
    }

    // if (redirectUrl !== '') return navigateTo(redirectUrl);

    if (addQuery !== null) return navigateTo({
        path,
        query: {
            ...query,
            ...addQuery,
        },
        replace: true
    });
})