import type { AnotherModelSignPromiseSettledResult, ClassAnotherModelSign, SignDetailContent, SignDetailContentPromiseSettledResult } from "./_types";
import { useFetchSignDetail } from "./useFetchSignDetail";

interface Props {
    useAsyncKey: string;
    modelid: string;
    digitalAssetsId?: number;
}
export const usePromiseAllSettled2 = async ({
    useAsyncKey,
    modelid,
    digitalAssetsId,
}: Props) => {

    const { getSignDetailContent, getAnotherModelSigns } = useFetchSignDetail();

    const signDetailContent = ref<SignDetailContent | null>(null);
    const anotherModelSigns = ref<ClassAnotherModelSign | null>(null);


    const initSignDetailContentData = (res: SignDetailContentPromiseSettledResult) => {
        if (res.status !== 'fulfilled') return;

        const { data } = res.value;
        if (data.value) {
            signDetailContent.value = data.value;
        }
    }
    
    const initAnotherModelSignsData = (res: AnotherModelSignPromiseSettledResult) => {
        if (res.status !== 'fulfilled') return;

        if (res.value) {
            anotherModelSigns.value = res.value;
        }
    }

    

    const [
        resSignContent,
        resAnotherSigns
    ] = await Promise.allSettled([
        useAsyncData(useAsyncKey, () => getSignDetailContent(useAsyncKey, modelid as string, digitalAssetsId)),
        getAnotherModelSigns(modelid as string, digitalAssetsId)
    ])
    initSignDetailContentData(resSignContent);
    initAnotherModelSignsData(resAnotherSigns);


    return {
        signDetailContent,
        anotherModelSigns,
    }
}