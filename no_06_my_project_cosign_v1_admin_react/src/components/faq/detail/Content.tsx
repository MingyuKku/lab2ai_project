import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Editor } from 'ckeditor5';
import { config } from 'containers/faq/ckEditor-config';
import 'ckeditor5/ckeditor5.css';


interface Props {
    data?: string | null;
}
const FaqContent: React.FC<Props> = ({ data }) => {
    return (
        <div className='flex items-center min-h-12 border-b border-border-gray-03'>
            <div className='text-center shrink-0 w-1/5 min-w-[90px] text-body-2r text-font-dark-02'>문의내용</div>
            <div className="ckeditor-wrapper">
                <CKEditor
                    editor={ ClassicEditor }
                    data={ data ?? '' }
                    config={{
                        ...config,
                        toolbar: {
                            items: []
                        },
                    }}
                    onReady={editor => {
                        console.log('Editor is ready to use!',);
                        editor.enableReadOnlyMode('faq-item-editor');
                    }}
                />
            </div>
        </div>
        
    )
}

export default FaqContent
