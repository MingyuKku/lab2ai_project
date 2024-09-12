import type { BasicRes } from "~/composables/_api/_types";
import type { FormDataParams, QnaList } from "./_types";
import { routeQueryPage } from "../business/constant";

export const useFetchQna = () => {

    const getFormDataParam = ({
        email,
        content,
        attachFileList,
        getAgentInfo
    }: FormDataParams): FormData => {
        const formData = new FormData();
        formData.append('email', email)
        formData.append('content', content)
        attachFileList.forEach(item => {
            formData.append('images', item)
        })
    
        getAgentInfo.platform !== null ? formData.append('platform', getAgentInfo.platform) : undefined;
        getAgentInfo.appVersion !== null ? formData.append('appVersion', getAgentInfo.appVersion) : undefined;
        getAgentInfo.osVersion !== null ? formData.append('osVersion', getAgentInfo.osVersion) : undefined;
        getAgentInfo.deviceModel !== null ? formData.append('deviceModel', getAgentInfo.deviceModel) : undefined;
        getAgentInfo.browser !== null ? formData.append('browser', getAgentInfo.browser) : undefined;

        return formData;
    }


    const submitQna = async (formData: FormData): Promise<any | null> => {

        const { $serviceContentApiFetch } = useNuxtApp();
        
        try {

            const res = await $serviceContentApiFetch<BasicRes>('menu/customer-center/inquiry', {
                method: 'POST',
                credentials: 'include',
                body: formData
            })

            console.log('전송 응답', res)
            
        } catch (err) {
            return null;
        }
    }


    const getMyQna = async (key: string): Promise<QnaList | null> => {

        const { data: cache } = useNuxtData(key);

        if (cache.value) return cache.value;
        
        const { $serviceContentApiFetch } = useNuxtApp();
        const { query } = useRoute();

        const page = Number(query[routeQueryPage]);

        try {
            const { data } = await $serviceContentApiFetch<BasicRes>(`menu/customer-center/inquiry/list`, {
                method: 'POST',
                credentials: 'include',
                params: {
                    'page': page - 1
                }
            });

            if (!data || !data.inquiryList) return null;

            const { inquiryList }:{inquiryList: QnaList} = data;

            return inquiryList;

        } catch (err) {
            return null;
        }
    }


    return {
        getFormDataParam,
        submitQna,
        getMyQna,
    }
}