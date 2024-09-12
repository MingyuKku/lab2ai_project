import { DefaultRes, ReturnSuccess } from "_api/_types";
import { serviceAxios } from "_api/service";
import { MemberDetailRes, MemberFetchPathParamType, MemberListRes, MemberUpdateSubmitParams } from "./_types";
// import { useNavigate } from "react-router-dom";

export const useFetchMember = () => {
    
    const getList = async (page: number, pathState: MemberFetchPathParamType | 'list' = 'list', keyword?: string): Promise<MemberListRes | null> => {
        
        try {
            const { data } = await serviceAxios().get<DefaultRes>(`member/${pathState}`, {
                params: {
                    // page: keyword ? 0 : page,
                    page,
                    [pathState]: keyword
                }
            })

            if (!data) return null;
            if (!data.data) return null;

            const { memberList }: { memberList: MemberListRes } = data.data;

            if (!memberList) {
                const { members }: { members: MemberListRes } = data.data;
                if (!members) return null;
                return members;
            }

            return memberList;

        } catch (err) {
            return null;
        }
    }


    const getMemberItem = async (id?: string | number): Promise<MemberDetailRes | null> => {
        if (!id) return null;

        try {
            const { data } = await serviceAxios().get<DefaultRes>(`member/detail`, {
                params: {
                    userId: id,
                }
            })

            if (!data) return null;
            const { memberDetail }: {memberDetail: MemberDetailRes} = data.data;
            if (!memberDetail) return null;

            return memberDetail;
            
        } catch (err) {
            return null;
        }
    }


    const updateMember = async (params: MemberUpdateSubmitParams): Promise<ReturnSuccess> => {
        try {
            const { data } = await serviceAxios().patch(`member/user-info`, Object.getParams(params))

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


    const resetPassword = async (email: string): Promise<ReturnSuccess> => {
        try {
            const { data } = await serviceAxios().patch(`member/reset/password`, Object.getParams({
                email
            }))

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


    const resetCellphone = async (uuid: string): Promise<ReturnSuccess> => {
        try {
            const { data } = await serviceAxios().patch(`member/reset/cellphone`, Object.getParams({
                userId: uuid
            }))

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
        getMemberItem,
        updateMember,
        resetPassword,
        resetCellphone,
    }
}