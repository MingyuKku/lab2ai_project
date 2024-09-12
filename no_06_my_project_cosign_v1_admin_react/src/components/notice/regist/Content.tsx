import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Editor } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import { config } from 'containers/faq/ckEditor-config';
import { useCKEditorUploadAdapter } from 'hooks/faq/useCKEditorUploadAdapter';


interface Props {
    initData?: string;
    setContent: React.Dispatch<React.SetStateAction<string | null>>;    
    setFiles: React.Dispatch<React.SetStateAction<string[]>>;    
}

const Content: React.FC<Props> = ({ initData, setContent, setFiles }) => {

    const { customUploadAdapter } = useCKEditorUploadAdapter();


    function uploadPlugin (editor: Editor){ // (3)
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return customUploadAdapter(loader, setFiles);
        }
    }

    return (
        <div className='flex items-center mb-space-bottom-lg'>
            <h1 className='text-h4 font-medium shrink-0 min-w-[90px] w-1/5'>공지 내용</h1>
            <CKEditor
                editor={ ClassicEditor }
                data={ initData }
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
                    console.log(`Change: ${ data }`);
                    setContent(data);
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </div>
    )
}

export default React.memo(Content)
