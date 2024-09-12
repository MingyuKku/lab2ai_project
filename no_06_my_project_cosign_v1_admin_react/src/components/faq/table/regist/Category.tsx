import React from 'react'
import Select from 'components/common/select/Select'
import { SelectValue } from 'components/common/select/_types'
import { FaqCategoryType } from 'hooks/faq/_types'


interface Props {
    selectedItem?: FaqCategoryType;
    setCategory: React.Dispatch<React.SetStateAction<FaqCategoryType>>    
}

const Category: React.FC<Props> = ({ selectedItem: propsSelectedItem, setCategory }) => {

    const VALUES: SelectValue<FaqCategoryType>[] = [
        {
            key: 'SERVICE_USAGE',
            label: '서비스이용',
        },
        {
            key: 'ACCOUNT',
            label: '계정',
        },
        {
            key: 'PAYMENT',
            label: '결제',
        },
        {
            key: 'PARTNERSHIP',
            label: '제휴',
        },
    ]

    

    // const [ selectedIndex, setSelectedIndex ] = React.useState(0);
    const [ selected, setSelectItem ] = React.useState<SelectValue<FaqCategoryType> | undefined>(VALUES[0]);

    
    React.useEffect(() => {
        const findItem = VALUES.find(item => item.key === propsSelectedItem);
        
        if (findItem) {
            setSelectItem(findItem);
        } else {
            setSelectItem(VALUES[0]);
        }
        // setSelectedIndex(getIndex());
    }, [propsSelectedItem])

    React.useEffect(() => {
        if (!selected?.key) return;
        setCategory(selected.key);

    }, [selected])

    return (
        <div className='flex items-center mb-space-bottom-lg'>
            <h1 className='text-h4 font-medium shrink-0 min-w-[90px] w-1/5'>카테고리</h1>
            <Select
                values={ VALUES }
                selectedItem={ selected }
                changeSelect={ setSelectItem }
            />
        </div>
    )
}

export default React.memo(Category);
