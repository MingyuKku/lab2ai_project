import type { ClassSignDetailInfo, RecentSignList, RecentSignlistPromiseSettledResult, SignProfilePromiseSettledResult } from "./_types";
import { useFetchSignDetail } from "./useFetchSignDetail";


interface Props {
    useAsyncKey: string;
    locale: string;
    modelid: string;
    signid: string;
}
export const usePromiseAllSettled1 = async ({
    useAsyncKey,
    locale,
    modelid,
    signid,
}: Props) => {

    const { getSignDetailProfile, getRecentSignList } = useFetchSignDetail();

    const signProfile = ref<ClassSignDetailInfo | null>(null);
    const recentSignlist = ref<RecentSignList[]>([]);

    const initSignProfileData = (res: SignProfilePromiseSettledResult) => {
        if (res.status !== 'fulfilled') return;

        const { data } = res.value;
        if (data.value) {
            signProfile.value = data.value;
        }
    }

    const initRecentSignlistData = (res: RecentSignlistPromiseSettledResult) => {
        if (res.status !== 'fulfilled') return;
        
        if (res.value) {
            recentSignlist.value = res.value;
        }
    }


    const [
        res_profile,
        res_signlist
    ] = await Promise.allSettled([
        useAsyncData(useAsyncKey, () => getSignDetailProfile(useAsyncKey, locale as string, modelid as string, signid as string)),
        getRecentSignList(modelid as string, signid as string)
    ])
    initSignProfileData(res_profile);
    initRecentSignlistData(res_signlist);

    return {
        signProfile,
        recentSignlist,
    }
}