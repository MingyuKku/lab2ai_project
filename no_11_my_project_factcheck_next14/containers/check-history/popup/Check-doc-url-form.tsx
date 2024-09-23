import React from 'react';
import IconUpload from '@/components/icon/Upload';
import ButtonLg from '@/components/buttons/Button-lg';
import Radio from '@/components/form/Radio';
import { RadioList } from '@/components/form/_types';
import NewUserRegistDoc from '@/containers/check-history/popup/New-user-regist-doc';
import NewUserRegistFile from '@/containers/check-history/popup/New-user-regist-file';
import NewUserRegistText from '@/containers/check-history/popup/New-user-regist-text';
import { DocType } from '@/services/check-history/_types';
import { useFetchRequestCheckParser } from '@/services/check-history/use-fetch-request-check-parser';
import { useSubmitCheck } from '@/hooks/check-history/use-submit-check';



interface Props {
    items: RadioList<DocType>[];
    title: string;
    setSidePopupFlag: React.Dispatch<React.SetStateAction<boolean>>;
}


const CheckDocUrlForm: React.FC<Props> = ({ items, title, setSidePopupFlag }) => {

    const { checkedItem, updateItem, onSubmitRequestCheck } = useSubmitCheck(items, setSidePopupFlag);
    
    return (
        <div className='pl-[54px] pr-9 py-[68px]'>
            <div className='flex items-center'>
                <IconUpload color='black' />
                <h1 className='title-lg ml-2'>{ title }</h1>
            </div>
            <form onSubmit={ onSubmitRequestCheck } action="post" className='mt-9'>
                <div className="form-box py-4 rounded-l overflow-hidden">
                    <div className='body-sm text-center text-primary-red mt-6'>* 팩트 체크 요청할 문서의 형태를 선택해 주세요.</div>
                    <div className='mt-3 flex items-center justify-center'>
                        <Radio<DocType>
                            name='doc-type'
                            items={ items }
                            checkedItem={ checkedItem }
                            updateItem={ updateItem }
                            itemClassName='mr-9 last:mr-0'
                        />
                    </div>
                </div>
                <div className="form-box mt-6">
                    {
                        checkedItem.value === 'text' &&
                        <NewUserRegistText
                            label='텍스트 입력'
                            inputName={ items.find(item => item.value === 'text')?.value ?? '' }
                            inputClassName='w-full h-[334px] max-h-[334px] overflow-y-auto'
                        />
                    }
                    {
                        checkedItem.value === 'url' &&
                        <NewUserRegistDoc
                            label='URL 등록'
                            inputName={ items.find(item => item.value === 'url')?.value ?? '' }
                            inputClassName='w-full'
                        />
                    }
                    {
                        checkedItem.value === 'file' &&
                        <NewUserRegistFile
                            label='파일 등록'
                            inputName={ items.find(item => item.value === 'file')?.value ?? '' }
                            inputClassName='w-[320px]'
                        />
                    }
                </div>
                
                <div className="button-area flex items-center justify-center mt-10">
                    <ButtonLg
                        label='체크하기'
                        type='submit'
                        className='w-[220px] title-sm'
                    />
                </div>
            </form>
        </div>
    )
}

export default CheckDocUrlForm;
