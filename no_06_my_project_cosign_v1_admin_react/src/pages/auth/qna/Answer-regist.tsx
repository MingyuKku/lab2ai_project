import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Editor } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import { config } from 'containers/faq/ckEditor-config';
import Button from 'components/common/button/Button';
import { QnaRegistContext } from 'hooks/qna/_types';
import { useOutletContext } from 'react-router-dom';
import { useCKEditorUploadAdapter } from 'hooks/faq/useCKEditorUploadAdapter';
import { useSubmitAnswer } from 'hooks/qna/useSubmitAnswer';


const AnswerRegist = () => {
    
    const { email, member, userContent, userAddDateTime } = useOutletContext<QnaRegistContext>();
    
    const { setContent, onClickAnswerRegist } = useSubmitAnswer({
        email,
        member,
        userContent,
        userAddDateTime
    });

    const { customUploadAdapter } = useCKEditorUploadAdapter();

    function uploadPlugin (editor: Editor){ // (3)
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        }
    }
    
    
    return (
        <div className='mt-10'>
            <h1 className='text-h5 mb-space-bottom-sm'>관리자 답변</h1>
            <CKEditor
                editor={ ClassicEditor }
                config={ 
                    {
                        ...config,
                        extraPlugins: [ uploadPlugin ]
                    }
                }
                onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    // console.log(`Change: ${ data }`);
                    setContent(data);
                }}
                onBlur={(event, editor) => {
                    // console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    // console.log('Focus.', editor);
                }}
            />
            <div className="buttons relative flex items-center justify-center mt-space-top-lg">
                <div className='flex items-center'>
                    <Button
                        label='답변 등록하기'
                        className='whitespace-nowrap px-primary'
                        onClick={ onClickAnswerRegist }
                    />
                </div>
            </div>
        </div>
    )
}

export default AnswerRegist;
