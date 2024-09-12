import { serviceAxios } from "_api/service";
import { DefaultRes, ReturnSuccess } from "_api/_types";
import { QnaDetailRes, QnaListRes, QnaRegistParams } from "./_types";

export const useFetchQna = () => {

    const getList = async (page: number): Promise<QnaListRes | null> => {
        
        try {
            const { data } = await serviceAxios().get<DefaultRes>(`inquiry/list`, {
                params: {
                    page,
                }
            })

            if (!data) return null;
            if (!data.data) return null;

            const { signInquiryList }: { signInquiryList: QnaListRes } = data.data;

            return signInquiryList;

        } catch (err) {
            return null;
        }
    }


    const getQnaItem = async (id?: string | number): Promise<QnaDetailRes | null> => {
        if (!id) return null;

        try {
            const { data } = await serviceAxios().get<DefaultRes>(`inquiry/detail`, {
                params: {
                    id
                }
            })

            if (!data) return null;
            const { siteInquiryDetail }: {siteInquiryDetail: QnaDetailRes} = data.data;
            if (!siteInquiryDetail) return null;

            return siteInquiryDetail;
            
        } catch (err) {
            return null;
        }
    }


    const registQnaAnswer = async (params: QnaRegistParams): Promise<ReturnSuccess> => {
        try {
            const { data } = await serviceAxios().post(`inquiry`, Object.getParams(params))

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
    

    const deleteQna = async (id?: string | number): Promise<ReturnSuccess> => {
        if (!id) return {
            isSuccess: 'fail'
        }
        
        try {
            const { data } = await serviceAxios().delete(`inquiry`, {
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
        getQnaItem,
        registQnaAnswer,
        deleteQna,
    }
}