import { returnFetch } from "../_fetch"
import { DefaultRes } from "../_fetch/_types";
import { DocsHistory, DocsHistoryResponse, HistoryDocumentJsonData } from "./_types";

export const useFetchCheckHistory = () => {

    const getMemberNameList = async (): Promise<string[] | null> => {
        try {
            const res = await returnFetch<DefaultRes>(`member/name/list`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (!res?.data) return null;
            if (!res.data.result) return null;

            return res.data.result;
            
        } catch (err) {
            return null;
        }
    }


    const getList = async (page: string | number): Promise<DocsHistory | null> => {
        try {
            const res = await returnFetch<DefaultRes>(`docs/list/${0}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (!res?.data) return null;
            if (!res.data.result) return null;

            return res.data.result;
            
        } catch (err) {
            return null;
        }
    }

    
    return {
        getMemberNameList,
        getList,
    }
}