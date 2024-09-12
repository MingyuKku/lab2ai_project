import { serviceAxios } from "_api/service";
import { TotalUserInfoRes, UserListRes } from "./_types";
import { ReturnSuccess } from "_api/_types";

export const useFetchUsers = () => {
    const getPurchaseUsers = async (): Promise<TotalUserInfoRes | null> => {
        try {
            const { data } = await serviceAxios().get(`purchase/active/count`)

            if (!data) return null;
            if (!data.data) return null;
            
            const{ totalPurchaseOrderUserInfo }:{totalPurchaseOrderUserInfo: TotalUserInfoRes} = data.data;

            return totalPurchaseOrderUserInfo;
            
        } catch (err) {
            return null;
        }
    }


    const getUsersList = async (page: string | number): Promise<UserListRes | null> => {
        try {
            const { data } = await serviceAxios().get(`purchase/list`, {
                params: {
                    page,
                }
            })

            if (!data) return null;
            if (!data.data) return null;
            
            const { purchaseTicketUserList }:{purchaseTicketUserList: UserListRes} = data.data;

            return purchaseTicketUserList;
            
        } catch (err) {
            return null;
        }
    }


    const downloadCSV = async (): Promise<any | null> => {
        try {
            const { data } = await serviceAxios().post(`purchase/csv`)

            return data;
            
        } catch (err) {
            return null;
        }
    }


    return {
        getPurchaseUsers,
        getUsersList,
        downloadCSV,
    }
}