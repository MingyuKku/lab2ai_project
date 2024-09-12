import type { LocationQueryRaw } from '#vue-router';
import { routeQueryPage, routeQueryCategory } from '~/composables/customer/business/constant';

export default defineNuxtRouteMiddleware((to, from) => {

    const { fullPath, path, query } = to;
    const page = query[routeQueryPage];
    const category = query[routeQueryCategory];
    

    let addQuery: LocationQueryRaw | null = null;
    
    
    // let redirectUrl = '';


    // 라우터 쿼리에 페이지번호가 없는 경우 디폴트로 '1' 리다이렉트
    // 라우터 쿼리에 카테고리가 없는 경우 디폴트로 'all' 리다이렉트
    if (!page) {
        if (category) {
            // redirectUrl = `${fullPath}/?${routeQueryPage}=${1}&${routeQueryCategory}=${category}`;
            addQuery = {
                [routeQueryPage]: 1,
                [routeQueryCategory]: category
            }
        } else {
            addQuery = {
                [routeQueryPage]: 1,
                [routeQueryCategory]: 'all'
            }
        }

    } else {
        if (!category) {
            addQuery = {
                [routeQueryCategory]: category
            }
        }
    }


    // if (redirectUrl !== '') return navigateTo(redirectUrl);

    if (addQuery !== null) return navigateTo({
        path,
        query: {
            ...query,
            ...addQuery,
        },
        // replace: true
    });


})