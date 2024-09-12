import React from 'react'
import { RadioList } from './_types';


interface Props<T> {
    name: string;
    items: RadioList[];
    checkedItem: T;
    updateItem: React.Dispatch<React.SetStateAction<T>>;
    className?: string;
    itemClassName?: string;
}

const Radio = <T, >({ name, items, checkedItem, updateItem, className, itemClassName }: Props<T>) => {

    const onChangeRadio = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        updateItem(e.target.value as T);
    }, [])
    
    return (
        <div className={`flex items-center ${ className }`}>
            {
                items.map((item, idx) => (
                    <label key={ idx } className={`cursor-pointer flex items-center ${ itemClassName }`}>
                        <input
                            type="radio"
                            name={ name }
                            value={ item.value }
                            checked={ checkedItem === item.value }
                            onChange={ onChangeRadio }
                            hidden
                        />
                        <div className='flex items-center justify-center w-[18px] h-[18px] border border-achromatic-black rounded-full'>
                            { checkedItem === item.value && <div className='w-2 h-2 bg-achromatic-black rounded-full'></div> }
                        </div>
                        <span className='body-sm ml-2'>{ item.label }</span>
                    </label>
                ))
            }
            
        </div> 
    )
}

export default Radio
