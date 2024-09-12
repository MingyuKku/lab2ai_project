import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReturnSuccess } from "_api/_types";
import { FaqCategoryType, FaqRegistParams } from "./_types";
import { useValidate } from "hooks/_app/useValidate";

export const useSubmit = (submitFetch: (params: FaqRegistParams) => Promise<ReturnSuccess>, successAfterUrl: string) => {

    const navigator = useNavigate();
    const { id } = useParams();
    const { checkValidateTextBlank } = useValidate();
    
    const [ submitFlag, setSubmitFlag ] = React.useState(false);
    const [ category, setCategory ] = React.useState<FaqCategoryType>('SERVICE_USAGE');
    const [ title, setTitle ] = React.useState<string>('');
    const [ titleError, setTitleError ] = React.useState(false);
    const [ content, setContent ] = React.useState<string>('');
    const [ files, setFiles ] = React.useState<string[]>([]);


    const onClickSubmit = React.useCallback(async (type: 'regist' | 'update') => {

        if (submitFlag) return;
        setSubmitFlag(true);

        if (!checkValidateTextBlank(title, setTitleError)) return setSubmitFlag(false);


        const params: FaqRegistParams = {};

        if (category) params.category = category;
        if (title !== '') params.title = title;
        if (content !== '') params.content = content;
        
        if (type === 'regist') {
            if (files.length) params.editorFile = files;
        }

        if (type === 'update') {
            params.id = id;
        }
        
        const { isSuccess } = await submitFetch(params);
        if (isSuccess === 'success') {
            navigator(successAfterUrl);
        }

        setSubmitFlag(false);

    }, [submitFlag, category, title, content, files]);

    return {
        category,
        setCategory,
        title,
        setTitle,
        titleError,
        content,
        setContent,
        setFiles,
        onClickSubmit,
    }
}