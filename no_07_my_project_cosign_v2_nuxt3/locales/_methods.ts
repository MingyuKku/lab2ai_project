import { useStateLocale } from '~/composables/useState/locale';
import i18nConfig from '~/locales/_config';

export function i18nMethods() {

    const extractLanguages = (langInfo: string) => {

        const langSet = new Set(
            langInfo.split(',')
            .map(lang =>
                    lang.split(';')[0]
                        .split('-')[0]
                )
        )

        return [...langSet];
    }


    /**
     * SSR에서 accept-language에 접근해 가장 우선순위의 언어를 추출하는 메서드
     */
    const getPrimaryLanguages = (langInfo: string): string[] => {

        // ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7
        // ko,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,fr;q=0.6,ko-KR;q=0.5,en-US;q=0.4
        // 위 두가지 타입의 accept-language 에서 가장 우선순위의 언어를 추출
        if (langInfo) {
            return extractLanguages(langInfo);

        } else { // langInfo이 존재하지 않는 경우 개발자가 지정한 디폴트 언어로 반환됨
            return [i18nConfig.defaultLocale];
        }
    }


    const isLocale = (lcoale: string) => {
        const { getLocales } = useStateLocale();
        const locales = getLocales();

        return locales.value[0] === lcoale;
    }
    
    

    return {
        getPrimaryLanguages,
        isLocale,
    }
}

