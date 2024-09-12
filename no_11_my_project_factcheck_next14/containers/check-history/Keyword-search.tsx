import React from 'react';
import FormInputSs from '@/components/form/Input-ss';

const KeywordSearch = () => {
    return (
        <div className='search flex items-center ml-4'>
            <span className='body-sm-b'>키워드</span>
            <div className='ml-2'>
                <FormInputSs
                    name='keyword'
                    type='text'
                    placeholder='키워드 검색'
                    className='w-[240px]'
                />
            </div>
        </div>
    )
}

export default KeywordSearch;
