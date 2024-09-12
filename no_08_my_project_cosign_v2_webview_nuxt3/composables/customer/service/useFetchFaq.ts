import type { BasicRes } from "~/composables/_api/_types";
import type { CategoryType, QuestionList } from "./_types";
import { routeQueryCategory, routeQueryKeyword, routeQueryPage } from "../business/constant";

export const useFetchFaq = () => {
    
    const { $serviceContentApiFetch } = useNuxtApp();


    const getKeywordList = async (page: number, keyword: string): Promise<QuestionList | null> => {
        try {
            const { data } = await $serviceContentApiFetch<BasicRes>(`menu/customer-center/search-keyword/list`, {
                method: 'GET',
                params: {
                    'keyword': keyword,
                    'page': page - 1
                }
            });

            if (!data || !data.questionList) return null;

            const { questionList }:{questionList: QuestionList} = data;

            return questionList;

        } catch (err) {
            return null;
        }
    }


    const getLatestList = async (page: number): Promise<QuestionList | null> => {
        try {
            const { data } = await $serviceContentApiFetch<BasicRes>(`menu/customer-center/latest/list`, {
                method: 'GET',
                params: {
                    'page': page - 1
                }
            });

            if (!data || !data.questionList) return null;

            const { questionList }:{questionList: QuestionList} = data;

            return questionList;

        } catch (err) {
            return null;
        }
    }

    const getCategorytList = async (page: number, category: CategoryType): Promise<QuestionList | null> => {
        try {
            const { data } = await $serviceContentApiFetch<BasicRes>(`menu/customer-center/category/list`, {
                method: 'GET',
                params: {
                    'categoryType': category,
                    'page': page - 1
                }
            });

            if (!data || !data.questionList) return null;

            const { questionList }:{questionList: QuestionList} = data;

            return questionList;

        } catch (err) {
            return null;
        }
    }
    


    const getFaqList = async (key: string): Promise<QuestionList | null> => {

        const { data:cache } = useNuxtData<QuestionList>(key);
        if (cache.value) return cache.value;

        const { query } = useRoute();

        const page = Number(query[routeQueryPage]);
        const category = query[routeQueryCategory] as CategoryType | 'all';
        const keyword = query[routeQueryKeyword] as string;
        
        
        if (keyword) return await getKeywordList(page, keyword);
        if (category === 'all') return await getLatestList(page);
        else return await getCategorytList(page, category);
    }


    return {
        getFaqList
    }
}