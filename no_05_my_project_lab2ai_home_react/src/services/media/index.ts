import { LocaleTextType } from "@/locales/_type";

export interface MediaItems {
    date: string;
    items: {
        date: string;
        text: string;
        href: string;
    }[];
}

export function groupBy(text:LocaleTextType | null, locale: string) {
    const newItems:MediaItems[] = [];
    const getLocale = locale === 'ko' ? 'ko' : 'en';

    if (text) {
        text.media.items.forEach((item,idx) => {
        const year = new Date(item.date).getFullYear();

        if (year >= 2023) {
            
            const copyedItem = {...item};
            if (year === 2024) {
                copyedItem.date = new Intl.DateTimeFormat(getLocale, {
                    month: '2-digit',
                    day: '2-digit'
                }).format(new Date(copyedItem.date));
            } else {
                copyedItem.date = new Intl.DateTimeFormat(getLocale, {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit'
                }).format(new Date(copyedItem.date));
            }
            


            if (newItems.length === 0) {
                newItems.push({
                    date: '2024 ~ 2023',
                    items: [copyedItem]
                })
            } else {
                newItems[0].items = [
                    ...newItems[0].items,
                    copyedItem
                ]
            }

        } else {
            const copyedItem = {...item}
            if (year === 2022) {
                copyedItem.date = new Intl.DateTimeFormat(getLocale, {
                    month: '2-digit',
                    day: '2-digit'
                }).format(new Date(copyedItem.date));

            } else {
                copyedItem.date = new Intl.DateTimeFormat(getLocale, {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit'
                }).format(new Date(copyedItem.date));

            }

            if (!newItems[1]) {
            newItems.push({
                date: '2022 ~ 2018',
                items: [copyedItem]
            })
            } else {
            newItems[1].items = [
                ...newItems[1].items,
                copyedItem
            ]
            }
        }
        })
    }

    return newItems;
}