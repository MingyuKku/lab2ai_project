import { serviceAxios } from "_api/service";
import { VersionContent, VersionContentRes } from "./_types";
import { ReturnSuccess } from "_api/_types";

export const useFetchVersion = () => {

    const getVersionHistory = async (platformType: string, page: string | number): Promise<VersionContentRes | null> => {
        try {
            const { data } = await serviceAxios().get(`version-control/list/${platformType}`, {
                params: {
                    page
                }
            })

            if (!data) return null;
            if (!data.data) return null;
            
            const { versionControlList }:{versionControlList: VersionContentRes} = data.data;

            return versionControlList;
            
        } catch (err) {
            return null;
        }
    }


    const getVersionItem = async (id?: string): Promise<VersionContent | null> => {
        if (!id) return null;

        try {
            const { data } = await serviceAxios().get(`version-control/${id}`)

            if (!data) return null;
            if (!data.data) return null;
            
            const { versionControl }:{versionControl: VersionContent} = data.data;

            return versionControl;
            
        } catch (err) {
            return null;
        }
    }


    const registVersion = async (formData: FormData): Promise<ReturnSuccess> => {
        try {
            const { data } = await serviceAxios().post(`version-control`, formData)

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

    
    const updateVersion = async (formData: FormData): Promise<ReturnSuccess> => {
        try {
            const { data } = await serviceAxios().patch(`version-control`, formData)

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


    const deleteVersion = async (id?: string): Promise<ReturnSuccess> => {
        if (!id) return {
            isSuccess: 'fail'
        }
        try {
            const { data } = await serviceAxios().delete(`version-control/${id}`)

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
        getVersionHistory,
        registVersion,
        getVersionItem,
        updateVersion,
        deleteVersion,
    }
}