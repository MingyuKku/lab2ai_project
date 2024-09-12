import { useStateLocale } from "../useState/locale";
import type { MetaOgParams } from "./_types"

export const useMetaHead = () => {

    const { getLocales } = useStateLocale();
    const locales = getLocales();
    const locale = locales.value[0];
    
    const COMMON_TITLE = '코싸인(COSIGN)';
    const site_name = locale === 'ko'? '코싸인(COSIGN)': 'COSIGN';

    const setMetaOg = ({
        title,
        description,
        image
    }: MetaOgParams) => {

        const getMetaImage = () => {
            if (!image) return [];
            return [{
                property: 'og:image',
                name: 'twitter:card',
                content: image
            }]
        }


        const getLinkImage = () => {
            if (!image) return;
            return {
                link: [
                    {
                        rel: 'image_src',
                        href: image,
                    }
                ]
            }
        }

        useHead({
            title: `${COMMON_TITLE} - ${title}`,
            meta: [
                {
                    property: 'description',
                    name: 'description',
                    content: description,
                },
                {
                    property: 'og:description',
                    name: 'twitter:description',
                    content: description,
                },
                {
                    property: 'og:type',
                    name: 'og:type',
                    content: 'article',
                },
                {
                    property: 'og:site_name',
                    name: 'og:site_name',
                    content: site_name
                },
                {
                    property: 'og:title',
                    name: 'twitter:title',
                    content: `${title} - ${site_name}`
                },
                ...getMetaImage(),
            ],
            ...getLinkImage(),
        })
    }

    return {
        setMetaOg,
    }
}