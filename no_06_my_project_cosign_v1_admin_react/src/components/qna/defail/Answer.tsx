import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5';
import { config } from 'containers/faq/ckEditor-config';
import 'ckeditor5/ckeditor5.css';
import { AnswerInquiryData } from 'hooks/qna/_types';
import DetailDataLabel from 'components/common/parts/Detail-data-label';
import { useCommonGetText } from 'hooks/_app/useGetText';

interface Props {
    answerData: AnswerInquiryData | null;
}

const Answer: React.FC<Props> = ({ answerData }) => {

    const { createAtTextFull } = useCommonGetText();

    if (!answerData) return <React.Fragment />

    return (
        <div className='mt-10'>
            <div className='border-b border-border-gray-03'>
                <h1 className='text-h5 mb-space-bottom-sm'>관리자 답변</h1>
            </div>
            <DetailDataLabel<string> label='답변 등록시간' data={ createAtTextFull(answerData.answerAddTime) } />
            <div className='flex items-center min-h-12 border-b border-border-gray-03'>
                <div className='text-center shrink-0 w-1/5 min-w-[90px] text-body-2r text-font-dark-02'>답변 내용</div>
                <div className="ckeditor-wrapper">
                    <CKEditor
                        editor={ ClassicEditor }
                        data={ answerData.content }
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
        </div>
    )
}

export default Answer
