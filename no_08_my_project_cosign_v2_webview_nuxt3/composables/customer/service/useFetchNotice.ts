import type { BasicRes } from "~/composables/_api/_types";
import { routeQueryPage } from "../business/constant";
import type { NoticeDetail, NoticeList } from "./_types";

export const useFetchNotice = () => {

    const { $serviceContentApiFetch } = useNuxtApp();
    

    const getNoticeList = async (key: string): Promise<NoticeList | null> => {
        
        const { data: cache } = useNuxtData(key);
        if (cache.value) return cache.value;

        const { query } = useRoute();
        const page = Number(query[routeQueryPage]);
        
        try {

            const { data } = await $serviceContentApiFetch<BasicRes>('menu/notice/contraction', {
                method: 'GET',
                params: {
                    'page': page - 1,
                }
            })
    
            if (!data || !data.noticeList) return null;
            const { noticeList }:{ noticeList: NoticeList } = data;
            return noticeList;
            
        } catch (err) {
            return null;
        }
    }


    const getNoticeDetail = async (key: string, id: string): Promise<any | null> => {
        
        const { data: cache } = useNuxtData(key);
        if (cache.value) return cache.value;

        try {
            const { data } = await $serviceContentApiFetch<BasicRes>('menu/notice/detail', {
                method: 'GET',
                params: {
                    'id': id,
                }
            })
    
            if (!data || !data.notice) return null;
            const { notice }:{ notice: NoticeDetail } = data;
            return notice;
            
        } catch (err) {
            return null;
        }
    }
    
    return {
        getNoticeList,
        getNoticeDetail,
    }
}