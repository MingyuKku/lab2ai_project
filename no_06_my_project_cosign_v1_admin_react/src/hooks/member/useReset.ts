import React from "react";
import { MemberDetailRes } from "./_types";
import { useFetchMember } from "./useFetchMember";

export const useReset = (item: MemberDetailRes | null | undefined) => {

    const { resetPassword, resetCellphone } = useFetchMember();
    
    const onClickResetPassword = React.useCallback(async () => {
        if (!item || !item.email) return;

        const { isSuccess } = await resetPassword(item.email);
        if (isSuccess === 'success') {
            alert('패스워드 초기화 되었습니다.');
            window.location.reload();
        }
        
    }, [item])


    const onClickResetCellphone = React.useCallback(async () => {
        if (!item || !item.cellphoneNo) return;

        const { isSuccess } = await resetCellphone(item.uuid);
        if (isSuccess === 'success') {
            alert('핸드폰 인증 초기화 되었습니다.');
            window.location.reload();
        }
        
    }, [item])


    return {
        onClickResetPassword,
        onClickResetCellphone,
    }
}