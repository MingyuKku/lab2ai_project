'use client'

import React from 'react';
import IconTriangleDown from '@/components/icon/Triangle-down';
import { SelectList } from './_types';


interface Props<T> {
    items: SelectList<T>[];
    selectedItem: SelectList<T> | undefined;
    changeSelectItem: React.Dispatch<React.SetStateAction<SelectList<T> | undefined>>;
}

const Select = <T, >({ items, selectedItem, changeSelectItem }: Props<T>) => {

    const [ isOpen, toggleOpen ] = React.useState(false);


    return (
        <div
            className={`
                relative flex items-center justify-center w-[118px] h-8 bg-achromatic-white border border-achromatic-03 rounded-[1px]
                ${ isOpen ? 'border-primary-blue shadow-blue-01 transition-shadow duration-200 ease-in-out' : '' } 
            `}
            onClick={ () => toggleOpen(!isOpen) }
        >
            { isOpen && <div className="modal fixed top-0 left-0 w-full h-viewScreen z-10"></div> }
            <div className='flex items-center cursor-pointer px-2'>
                <input
                    type="text"
                    readOnly
                    value={ selectedItem?.label ?? '' }
                    className='none-st cursor-pointer block w-full body-sm'
                />
                <IconTriangleDown className={`shrink-0 ${ isOpen ? 'rotate-180' : '' } `} />
            </div>
            
            <div
                className={`
                    select-list absolute z-10 top-full w-full left-0 translate-y-0.5 shadow-02
                    ${ isOpen ? 'block' : 'hidden' }
                `}
            >
                {
                    items.map((item, idx) => (
                        <div
                            key={ idx }
                            className='px-2 body-sm h-8 leading-8 bg-achromatic-05 cursor-pointer shadow-1 hover:bg-achromatic-04'
                            onClick={ () => changeSelectItem(item) }
                        >
                            { item.label }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Select;
