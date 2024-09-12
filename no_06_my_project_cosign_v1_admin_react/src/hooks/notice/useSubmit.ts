import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReturnSuccess } from "_api/_types";
import { FileInstance } from "./_types";
import { useValidate } from "hooks/_app/useValidate";

export const useSubmit = (submitFetch: (params: any) => Promise<ReturnSuccess>, successAfterUrl: string) => {

    const navigator = useNavigate();
    const { id } = useParams();
    const { checkValidateTextBlank } = useValidate();
    
    const [ submitFlag, setSubmitFlag ] = React.useState(false);
    const [ title, setTitle ] = React.useState<string>('');
    const [ titleError, setTitleError ] = React.useState(false);
    const [ content, setContent ] = React.useState<string | null>(null);
    const [ files, setFiles ] = React.useState<string[]>([]);
    const [ attachFiles, setAttachFiles ] = React.useState<FileInstance[]>([]);
    const [ attachFileError, setAttachFileError ] = React.useState(false);
    const [ deleteFiles, setDeleteFiles ] = React.useState<string[]>([]);



    const onClickSubmit = React.useCallback(async (type: 'regist' | 'update') => {

        if (submitFlag) return;
        setSubmitFlag(true);

        if (!checkValidateTextBlank(title, setTitleError)) return setSubmitFlag(false);
        if (attachFileError) return setSubmitFlag(false);

        const formData: FormData = new FormData();


        formData.append('title', title);
        if (content) formData.append('content', content);


        if (type === 'regist') {
            for (const attachFile of attachFiles) {
                formData.append('files', attachFile);
            }
            if (files.length) formData.append('editorFile', files.join(','));
        }

        if (type === 'update') {
            for (const attachFile of attachFiles) {
                if (!attachFile.isUpdate) continue;
                formData.append('addFiles', attachFile);
            }
            for (const deleteFile of deleteFiles) {
                formData.append('deleteFile', deleteFile);
            }
            if (id) formData.append('id', id);
        }
        
        const { isSuccess } = await submitFetch(formData);
        if (isSuccess === 'success') {
            navigator(successAfterUrl);
        }

        setSubmitFlag(false);

    }, [submitFlag, title, content, attachFiles, files, attachFileError]);

    return {
        title,
        setTitle,
        titleError,
        content,
        setContent,
        setFiles,
        attachFiles,
        setAttachFiles,
        attachFileError,
        setAttachFileError,
        deleteFiles,
        setDeleteFiles,       
        onClickSubmit,
    }
}