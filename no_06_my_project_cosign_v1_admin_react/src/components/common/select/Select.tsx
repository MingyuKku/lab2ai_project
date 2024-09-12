import React from 'react'
import Input from '../input/Input'
import { DownOutlined } from '@ant-design/icons'
import { SelectValue } from './_types';


interface Props<T> {
    placeHolder?: string;
    values: SelectValue<T>[];
    // selectedIndex: number;
    selectedItem?: SelectValue<T>;
    // changeSelectIndex: React.Dispatch<React.SetStateAction<number>>;
    changeSelect: React.Dispatch<React.SetStateAction<SelectValue<T> | undefined>>;
}


const Select = <T extends string | number | readonly string[] | undefined>({ placeHolder, values, selectedItem, changeSelect }: Props<T>) => {

    const inputRef = React.useRef<HTMLInputElement>(null);
    const mirrorRef = React.useRef<HTMLSpanElement>(null);

    const [ isOpen, toggleOpen ] = React.useState(false);

    const initPlaceHolderFlag = React.useMemo(() => {
        return placeHolder ? true : false;
    }, [])
    const [ placeHolderFlag, setPlaceHolderFlag ] = React.useState(initPlaceHolderFlag);


    const initValueMaxLengthItem = React.useMemo(() => {
        const result = values.reduce((prev, cur) => {
            if (prev.label.length >= cur.label.length) return prev;
            else return cur;
        })

        if (placeHolder) {
            if (placeHolder.length >= result.label.length) return placeHolder
        }
        return result.label;
    }, [])


    const resizeInput = () => {
        if (!mirrorRef.current) return;
        if (!inputRef.current) return;

        inputRef.current.style.width = mirrorRef.current.offsetWidth + 36 + 'px';
    }

    React.useEffect(() => {
        resizeInput();

    }, [])


    // const onFocusInput = React.useCallback(() => {
    //     setFocus(true);
    // }, [])

    // const onBlurInput = React.useCallback(async () => {
    //     await delayed(blurTimer, 250);
    //     setFocus(false);
    // }, [])

    const onClickValue = React.useCallback((value: SelectValue<T>) => {
        setPlaceHolderFlag(false);
        changeSelect(value);
    }, [])

    // const styleAntIcon = React.useMemo(() => ({
    //     'fontSize': 12
    // }), [])

    
    // h-9 rounded-md px-2.5 text-body-3r border border-border-gray-02 focus:border-position-short focus:shadow-border-1 transition-border-shadow
    // h-7 bg-bg-white hover:bg-bg-gray-03 text-body-2r px-2.5 cursor-pointer
    return (
        <div
            className={`
                relative flex items-center justify-center h-9 bg-achromatic-white border border-border-gray-02 rounded-md
                ${ isOpen ? 'border-position-short shadow-border-1 transition-border-shadow duration-200 ease-in-out' : '' } 
            `}
            onClick={ () => toggleOpen(!isOpen) }
        >
            { isOpen && <div className="modal fixed top-0 left-0 w-full h-viewScreen z-10"></div> }
            <div className='flex items-center cursor-pointer px-2'>
                <input
                    ref={ inputRef }
                    type="text"
                    readOnly
                    // value={ selected }
                    value={ placeHolderFlag ? placeHolder : selectedItem?.label }
                    className='none-st cursor-pointer block w-full text-body-3r'
                />
                <DownOutlined className={`shrink-0 ${ isOpen ? 'rotate-180' : '' } `} />
            </div>
            <div
                className={`
                    select-list absolute z-10 top-full w-full left-0 translate-y-0.5 shadow-02 rounded
                    ${ isOpen ? 'block' : 'hidden' }
                `}
            >
                {
                    values.map((item, idx) => (
                        <div
                            key={ idx }
                            className='px-2.5 text-body-2r h-7 leading-7 bg-bg-white hover:bg-bg-gray-03 cursor-pointer'
                            onClick={ () => onClickValue(item) }
                        >
                            { item.label }
                        </div>
                    ))
                }
            </div>
            <span ref={ mirrorRef } className='mirror absolute top-80 opacity-0'>{ initValueMaxLengthItem }</span>
        </div>
    )
}

export default Select
