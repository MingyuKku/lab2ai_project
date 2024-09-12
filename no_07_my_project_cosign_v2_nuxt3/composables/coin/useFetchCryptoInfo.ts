import type { BasicRes } from "~/composables/_api/_types";
import type { CryptoDetailInfo } from "./tv-tech-chart/services/_types";

export const useFetchCryptoInfo = async (cryptoId: number | null) : Promise<CryptoDetailInfo | null>=> {
    const { $serviceContentApiFetch } = useNuxtApp();

    if(cryptoId !== null) {
        const { data } = await $serviceContentApiFetch<BasicRes>(`crypto-detail/${cryptoId}`);
    
        if(data && data.cryptoDetailInfo) {
            return data.cryptoDetailInfo;
        } else {
            return null;
        }
    } else {
        return null;
    }
}