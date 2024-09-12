import { RadioList } from 'components/common/input/_types';
import Radio from 'components/common/input/Radio';
import { PlatformType } from 'hooks/version/_types';
import React from 'react'

interface Props {
    ITEMS: RadioList[];
    checkedItem: PlatformType;
    updateItem: React.Dispatch<React.SetStateAction<PlatformType>>
}

const Platform: React.FC<Props> = ({ ITEMS, checkedItem, updateItem }) => {
    
    return (
        <div className='flex items-center mb-space-bottom-lg'>
            <h1 className='text-h4 font-medium shrink-0 min-w-[90px] w-1/5'>플랫폼<span className='text-position-short'>*</span></h1>
            <div className='w-full'>
                <Radio
                    name='production-mode'
                    items={ ITEMS }
                    checkedItem={ checkedItem }
                    updateItem={ updateItem }
                />
            </div>
        </div>
    )
}

export default React.memo(Platform);
