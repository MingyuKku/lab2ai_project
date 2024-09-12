import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReturnSuccess } from "_api/_types";
import { SelectValue } from "components/common/select/_types";
import { MemberUpdateSubmitParams } from "./_types";

export const useSubmit = (submitFetch: (params: any) => Promise<ReturnSuccess>, successAfterUrl: string) => {
    const navigator = useNavigate();
    const { id } = useParams();
    const [ email, setEmail ] = React.useState<string>('');
    const [ nickname, setNickname ] = React.useState<string>('');
    const [ eventCk, setEventCk ] = React.useState<SelectValue<boolean> | undefined>({
        key: true,
        label: '수신 동의'
    });


    const VALUES: SelectValue<boolean>[] = [
        {
            key: true,
            label: '수신 동의',
        },
        {
            key: false,
            label: '수신 거절',
        },
    ]
    
    const [ submitFlag, setSubmitFlag ] = React.useState(false);


    const onClickSubmit = React.useCallback(async () => {
        if (!id) return;
        if (submitFlag) return;
        setSubmitFlag(true);

        const params: MemberUpdateSubmitParams = {
            uuid: id,
            email,
            nickName: nickname,
            eventCk: eventCk?.key,
        }
        const { isSuccess } = await submitFetch(params);
        if (isSuccess === 'success') {
            navigator(successAfterUrl);
        }

        setSubmitFlag(false);

    }, [id, submitFlag, email, nickname, eventCk]);


    return {
        email,
        setEmail,
        nickname,
        setNickname,
        eventCk,
        setEventCk,
        VALUES,
        onClickSubmit,
    }
}