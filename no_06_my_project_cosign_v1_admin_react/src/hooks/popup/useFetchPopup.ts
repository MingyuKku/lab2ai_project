import { DefaultRes, ReturnSuccess } from "_api/_types";
import { serviceAxios } from "_api/service";
import { PopupBannerRes } from "./_types";

export const useFetchPopup = () => {
    const getPopupList = async (): Promise<PopupBannerRes[] | null> => {
        
        try {
            const { data } = await serviceAxios().get<DefaultRes>(`banner/list`)

            if (!data) return null;
            if (!data.data) return null;

            const { banners }: { banners: PopupBannerRes[] } = data.data;
            if (!banners) return null;

            return banners;

        } catch (err) {
            return null;
        }
    }


    const updatePopup = async (formData: FormData): Promise<ReturnSuccess> => {
        try {
            const { data } = await serviceAxios().post(`banner`, formData)

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


    const deletePopup = async (id?: string): Promise<ReturnSuccess> => {
        if (!id) return {
            isSuccess: 'fail'
        }
        try {
            const { data } = await serviceAxios().delete(`banner`, {
                params: {
                    bannerId: id
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
        getPopupList,
        updatePopup,
        deletePopup,
    }
}