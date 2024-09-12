import type { BasicRes } from "~/composables/_api/_types";
import { ClassAnotherModelSign, ClassSignDetailInfo, type AnotherModelSign, type RecentSignList, type SignDetailContent, type SignDetailInfo } from "./_types";
import { useInstance } from "~/composables/_api/useInstance";
import { useTimezoneCookies } from "~/composables/useCookie/timezone";

export function useFetchSignDetail() {

    const { $serviceSignApiFetch } = useNuxtApp();
    const { getCookie_timezone } = useTimezoneCookies();
    const timezoneCookie = getCookie_timezone();
    const { POJO, dateTimeFormat, numberFormat } = useInstance();

    const getSignDetailProfile = async (key: string, locale: string, modelId: string | number, subSeqId: string | number): Promise<ClassSignDetailInfo | null> => {
        try {
            const { data: cache } = useNuxtData(key);

            if (cache.value) return cache.value;

            const { data } = await $serviceSignApiFetch<BasicRes>(`sign/detail/${modelId}/${subSeqId}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!data || !data.signDetailInfo) return null;

            const { signDetailInfo }: { signDetailInfo: SignDetailInfo } = data;

            const dateFormat = dateTimeFormat(locale as string, {
                month: 'long',
                day: '2-digit',
                hour: '2-digit',
                hourCycle: 'h23',
                minute: '2-digit',
                timeZone: timezoneCookie.value ?? undefined
            });

            const instance = new ClassSignDetailInfo(signDetailInfo, dateFormat);
            return POJO<ClassSignDetailInfo>(instance);

        } catch (err) {
            return null;
        }

    }



    const getRecentSignList = async (modelid: string, subSeqId: string): Promise<RecentSignList[] | null> => {
        try {
            const { data } = await $serviceSignApiFetch<BasicRes>(`sign/detail/list/${modelid}/${subSeqId}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!data || !data.signList) return null;

            const { signList }:{ signList: RecentSignList[] } = data;
            return signList; 

        } catch (err) {
            return null;
        }
    }


    const getAnotherModelSigns = async (modelId: string | number, digitalAssetsId?: number): Promise<ClassAnotherModelSign | null> => {
        if (!digitalAssetsId) return null;

        try {
            const { data } = await $serviceSignApiFetch<BasicRes>(`sign/detail/another-model-sign/${modelId}/${digitalAssetsId}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!data || !data.anotherModelSign) return null;

            const { anotherModelSign }:{ anotherModelSign: AnotherModelSign } = data;
            
            const instance = new ClassAnotherModelSign(anotherModelSign, numberFormat);
            return POJO<ClassAnotherModelSign>(instance);

        } catch (err) {
            return null;
        }
    }


    const getSignDetailContent = async (key: string, modelId: string | number, digitalAssetsId?: number): Promise<SignDetailContent | null> => {
        if (!digitalAssetsId) return null;
        
        try {
            const { data: cache } = useNuxtData(key);

            if (cache.value) return cache.value;
            
            const { data } = await $serviceSignApiFetch<BasicRes>(`sign/detail/model-info/${modelId}/${digitalAssetsId}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!data || !data.modelInfo) return null;
            
            const { modelInfo }:{modelInfo: SignDetailContent} = data;
            return modelInfo;
            
        } catch (err) {
            return null;
        }
    }
    
    return {
        getSignDetailProfile,
        getRecentSignList,
        getAnotherModelSigns,
        getSignDetailContent,
    }
}