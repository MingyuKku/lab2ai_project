import React from 'react'
import Select from 'components/common/select/Select'
import { SelectValue } from 'components/common/select/_types'


export interface Props<T> {
    label: string;
    readonly items: SelectValue<T>[];
    selectedItem?: SelectValue<T>;
    setItem: React.Dispatch<React.SetStateAction<SelectValue<T> | undefined>>; 
}

const DataSelectLabel = <T extends string | number | readonly string[] | undefined>({ label, items, selectedItem, setItem }: Props<T>) => {

    // const [ selectedIndex, setSelectedIndex ] = React.useState(0);
    const [ selected, setSelect ] = React.useState<SelectValue<T> | undefined>(items[0]);

    

    React.useEffect(() => {
        if (!selectedItem) {
            setSelect(items[0]);
            return;
        }
        const findItem = items.find(item => item.key === selectedItem?.key);

        if (findItem) {
            setSelect(findItem);
        } else {
            setSelect(items[0])
        }

    }, [selectedItem])

    React.useEffect(() => {
        if (!selected) return;
        if (selectedItem?.key === selected.key) return;

        setItem(selected);

    }, [selected])

    return (
        <div className='flex items-center mb-space-bottom-lg'>
            <h1 className='text-h4 font-medium shrink-0 min-w-[90px] w-1/5'>{ label }</h1>
            <Select
                values={ items }
                selectedItem={ selected }
                changeSelect={ setSelect }
            />
        </div>
    )
}

export default React.memo(DataSelectLabel);
