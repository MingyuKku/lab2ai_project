import React from "react";
import { useFetchQna } from "./useFetchQna";
import { QnaRegistContext, QnaRegistParams } from "./_types";
import { formatDate } from "utils";
import { useNavigate, useParams } from "react-router-dom";

export const useSubmitAnswer = ({
    email,
    member,
    userContent,
    userAddDateTime
}: QnaRegistContext) => {
    const { id } = useParams();
    const navigator = useNavigate();
    const { registQnaAnswer } = useFetchQna();
    const [ content, setContent ] = React.useState('');
    const [ submitFlag, setSubmitFlag ] = React.useState(false);

    const onClickAnswerRegist = React.useCallback(() => {
        if (!id) return;
        if (submitFlag) return;
        setSubmitFlag(true);

        const params: QnaRegistParams = {
            inquiryId: id,
            email,
            member,
            userContent,
            userAddDateTime,
            content,
            addDateTime: formatDate(Date.toUtcText(new Date()), 'yyyy-MM-ddTHH:mm:ss')
        }

        registQnaAnswer(params)
        .then(res => {
            if (res.isSuccess === 'success') navigator(`/qna/${id}`, { replace: true });
        })
        .finally(() => {
            setSubmitFlag(false);
        })

    }, [id, content])

    return {
        setContent,
        onClickAnswerRegist,
    }
}