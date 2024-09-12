import { returnFetch } from "../_fetch"
import { HistoryDocumentJsonData } from "./_types";

export const useFetchCheckHistory = () => {

    const getList = async (): Promise<HistoryDocumentJsonData[] | null> => {
        try {
            const res = await returnFetch<HistoryDocumentJsonData[]>('doc/list', {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            return res;
        } catch (err) {
            return null;
        }
    }

    
    return {
        getList,
    }
}