import { DefaultRes, ReturnSuccess } from "_api/_types";
import { serviceAxios } from "_api/service";
import { NoticeDetailRes, NoticeListRes } from "./_types";

export const useFetchNotice = () => {

    const getList = async (page: number): Promise<NoticeListRes | null> => {
        try {
            const { data } = await serviceAxios().get<DefaultRes>(`notice/list`, {
                params: {
                    page,
                }
            })

            if (!data) return null;
            if (!data.data) return null;

            const { noticeList }: { noticeList: NoticeListRes } = data.data;

            return noticeList;

        } catch (err) {
            return null;
        }
    }


    const registNotice = async (formData: FormData): Promise<ReturnSuccess> => {
        try {
            const { data } = await serviceAxios().post(`notice`, formData)

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


    const getNoticeItem = async (id?: string | number): Promise<NoticeDetailRes | null> => {
        if (!id) return null;

        try {
            const { data } = await serviceAxios().get<DefaultRes>(`notice/detail`, {
                params: {
                    id
                }
            })

            if (!data) return null;
            const { notice }: {notice: NoticeDetailRes} = data.data;
            if (!notice) return null;

            return notice;
            
        } catch (err) {
            return null;
        }
    }


    const updateNotice = async (formData: FormData): Promise<ReturnSuccess> => {
        try {
            const { data } = await serviceAxios().patch(`notice`, formData)

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


    const deleteNotice = async (id?: string | number): Promise<ReturnSuccess> => {
        if (!id) return {
            isSuccess: 'fail'
        }
        
        try {
            const { data } = await serviceAxios().delete(`notice`, {
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
        registNotice,
        getNoticeItem,
        updateNotice,
        deleteNotice,
    }
}