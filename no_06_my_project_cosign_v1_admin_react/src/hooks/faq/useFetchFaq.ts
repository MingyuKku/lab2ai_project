import { serviceAxios } from "_api/service";
import { DefaultRes, ReturnSuccess } from "_api/_types";
import { FaqListRes, FaqRegistParams, FaqSortType, QuestionDetail } from "./_types";

export const useFetchFaq = () => {

    const getList = async (sortType: FaqSortType | undefined, page: number): Promise<FaqListRes | null> => {
        if (!sortType) return null;
        try {
            const { data } = await serviceAxios().get<DefaultRes>(`question/${sortType}/list`, {
                params: {
                    page,
                }
            })

            if (!data) return null;
            if (!data.data) return null;

            const { questionList }: { questionList: FaqListRes } = data.data;

            return questionList;

        } catch (err) {
            return null;
        }
    }


    const loadFileToServer = async (formData: FormData): Promise<string | null> => {
        try {
            const { data } = await serviceAxios().post(`notice/add-editor-file`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })

            if (!data) return null;

            const url = data as string;
            return url;
            
        } catch (err) {
            return null;
        }
    }


    const getFaqItem = async (id?: string | number): Promise<QuestionDetail | null> => {
        if (!id) return null;

        try {
            const { data } = await serviceAxios().get<DefaultRes>(`question/detail`, {
                params: {
                    id
                }
            })

            if (!data) return null;
            const { questionDetail }: {questionDetail: QuestionDetail} = data.data;
            if (!questionDetail) return null;

            return questionDetail;
            
        } catch (err) {
            return null;
        }
    }


    const registFaq = async (params: FaqRegistParams): Promise<ReturnSuccess> => {
        try {
            const { data } = await serviceAxios().post(`question`, Object.getParams(params))

            if (!data) return {
                isSuccess: 'fail'
            };

            return {
                isSuccess: 'success'
            }
            
        } catch (err) {
            return {
                isSuccess: 'fail'
            };
        }
    }


    const updateFaq = async (params: FaqRegistParams): Promise<ReturnSuccess> => {
        try {
            const { data } = await serviceAxios().patch(`question`, Object.getParams(params))

            if (!data) return {
                isSuccess: 'fail'
            };

            return {
                isSuccess: 'success'
            }
            
        } catch (err) {
            return {
                isSuccess: 'fail'
            };
        }
    }


    const deleteFaq = async (id?: string | number): Promise<ReturnSuccess> => {
        if (!id) return {
            isSuccess: 'fail'
        }
        
        try {
            const { data } = await serviceAxios().delete(`question`, {
                params: {
                    id,
                }
            })

            if (!data) return {
                isSuccess: 'fail'
            };

            return {
                isSuccess: 'success'
            }
            
        } catch (err) {
            return {
                isSuccess: 'fail'
            };
        }
    }


    return {
        getList,
        loadFileToServer,
        getFaqItem,
        registFaq,
        updateFaq,
        deleteFaq,
    }
}