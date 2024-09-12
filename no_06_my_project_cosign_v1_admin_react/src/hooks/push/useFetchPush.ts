import { ReturnSuccess } from "_api/_types";
import { serviceAxios } from "_api/service";

export const useFetchPush = () => {
    const registPush = async (formData: FormData): Promise<ReturnSuccess> => {
        try {
            const { data } = await serviceAxios().post(`alarm`, formData)

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
        registPush,
    }
}