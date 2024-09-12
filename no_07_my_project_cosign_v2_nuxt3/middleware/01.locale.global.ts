import type { LocationQueryRaw } from "#vue-router";
import { useStateLocale } from "~/composables/useState/locale";
import i18nConfig from '~/locales/_config';

export default defineNuxtRouteMiddleware(async (to, from) => {
    
    const { query, name: toName, path } = to;
    const { name: fromName } = from;
    const { locale } = query;
    

    // SSR 페이지 새로고침일 경우만 실행하는 조건
    if (toName !== fromName) return;
    if (process.client) return;


    // 라우트 네임이 'cert-'로 시작하면 해당 미들웨어를 적용하지 않음
    const exceptRouteNamePattern = /^cert-/;
    if (exceptRouteNamePattern.test(toName as string)) return;


    const { getLocales, changeLocaleState } = useStateLocale();
    const localesState = getLocales();

    let addQuery: LocationQueryRaw | null = null;

    if (locale === undefined) {

        addQuery = {
            locale: localesState.value[0]
        }

    } else {
        // url에 query.locale이 있는 경우

        // const isLocaleQuery = i18nConfig.locales.some(lo => lo.code === locale);
        const isLocaleQuery = localesState.value.some(lo => lo === locale);

        if (isLocaleQuery) {
            // i18nConfig에서 관리하는 locale과 query.locale이 일치하는 경우 -> 페이지 리다이렉트 없이 state값만 수정
            return changeLocaleState(locale as string);

        } else {
            // i18nConfig에서 관리하는 locale과 query.locale이 일치하지 않는 경우 -> url을 defaultLocale로 설정 후 홈으로 리다이렉트
            changeLocaleState(i18nConfig.defaultLocale);
            addQuery = {
                locale: i18nConfig.defaultLocale
            }
        }
    }


    if (addQuery !== null) return navigateTo({
        path: path,
        query: {
            ...query,
            ...addQuery,
        },
        replace: true
    });
})