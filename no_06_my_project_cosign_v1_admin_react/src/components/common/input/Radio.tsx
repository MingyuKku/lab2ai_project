import React from 'react'
import { RadioList, RadioName } from './_types';


interface Props {
    name: RadioName;
    items: RadioList[];
    checkedItem: any;
    updateItem: React.Dispatch<React.SetStateAction<any>>;
    bgClassName?: string;
}

const Radio: React.FC<Props> = ({ name, items, checkedItem, updateItem, bgClassName }) => {

    const computedItem = React.useMemo(() => {
        return items.map((item) => ({
            ...item,
            isFocus: false,
        }))

    }, [items])

    const [ clonItems, setClonItems ] = React.useState<RadioList[]>(computedItem);


    const onChangeRadio = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        updateItem(e.target.value);
    }, [])

    const onFocusRadio = React.useCallback((e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        setClonItems((prev) => {
            const updateItem = [...prev];
            updateItem[idx].isFocus = true;
            return updateItem;
        })
    }, [])

    const onBlurRadio = React.useCallback((e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        setClonItems((prev) => {
            const updateItem = [...prev];
            updateItem[idx].isFocus = false;
            return updateItem;
        })
    }, [])


    return (
        <div className='flex items-center text-body-2r'>
            {
                items.map((item,idx) => (
                    <React.Fragment key={ idx }>
                        <input
                            id={ item.id }
                            name={ name }
                            type="radio"
                            value={ item.value }
                            onChange={ onChangeRadio }
                            onFocus={ (e) => onFocusRadio(e, idx) }
                            onBlur={ (e) => onBlurRadio(e, idx) }
                            checked={ checkedItem === item.value }
                            className='peer'
                        />
                        <label
                            htmlFor={ item.id }
                            className={
                                `
                                    flex items-center cursor-pointer mr-3 last:mr-0 peer
                                    ${ checkedItem === item.value ? 'font-medium' : '' }
                                `
                            }
                        >
                            <div
                                className={`circle relative w-4 h-4 rounded-full mr-1`}
                            >
                                {
                                    clonItems[idx].isFocus &&
                                    <span className={`border-circle absolute xy-center z-[0] w-6 h-6 rounded-full opacity-25 ${ bgClassName ?? 'bg-position-short' }`}></span>
                                }
                                <span
                                    className={`
                                        out-circle absolute xy-center w-full h-full rounded-full border transition-background
                                        ${ checkedItem === item.value ? `${ bgClassName ?? 'bg-position-short' } border-transparent` : 'border-border-dark-03'}
                                    `}
                                ></span>
                                <span className='in-circle absolute xy-center w-[7px] h-[7px] bg-bg-white rounded-full'></span>
                            </div>
                            <span>{ item.label }</span>
                        </label>
                    </React.Fragment>
                    
                ))
            }
        </div>
    )
}

export default React.memo(Radio);
