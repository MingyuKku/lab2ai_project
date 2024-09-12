import type { CryptoDetailPageQueryContentsType } from "./_types";
import { queryName } from "./variables";

export const useQueryContentName = () => {

    return computed(() => {
        const { query } = useRoute();
        const contentName = query[queryName] as CryptoDetailPageQueryContentsType;
        return contentName;
    })
}