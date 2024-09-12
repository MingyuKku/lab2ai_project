import React from "react";
import { useNavigate } from "react-router-dom";
import { ReturnSuccess } from "_api/_types";
import { useValidate } from "hooks/_app/useValidate";

export const useSubmit = (submitFetch: (params: any) => Promise<ReturnSuccess>, successAfterUrl: string) => {
    
    const navigator = useNavigate();
    const { checkValidateTextBlank } = useValidate();
    
    const [ submitFlag, setSubmitFlag ] = React.useState(false);

    const [ title, setTitle ] = React.useState('');
    const [ titleError, setTitleError ] = React.useState(false);
    const [ appLink, setAppLink ] = React.useState('');
    const [ appLinkError, setAppLinkError ] = React.useState(false);
    const [ content, setContent ] = React.useState('');
    const [ contentError, setContentError ] = React.useState(false);


    const onClickSubmit = React.useCallback(async () => {

        if (submitFlag) return;
        setSubmitFlag(true);

        if (!checkValidateTextBlank(title, setTitleError)) return setSubmitFlag(false);
        if (!checkValidateTextBlank(appLink, setAppLinkError)) return setSubmitFlag(false);
        if (!checkValidateTextBlank(content, setContentError)) return setSubmitFlag(false);

        const formData: FormData = new FormData();

        formData.append('title', title);
        formData.append('deepLink', appLink);
        formData.append('content', content);
        
        
        const { isSuccess } = await submitFetch(formData);
        if (isSuccess === 'success') {
            navigator(successAfterUrl);
        }

        setSubmitFlag(false);

    }, [submitFlag]);


    return {
        title,
        setTitle,
        titleError,
        setTitleError,
        appLink,
        setAppLink,
        appLinkError,
        setAppLinkError,
        content,
        setContent,
        contentError,
        setContentError,
        onClickSubmit,
    }
}