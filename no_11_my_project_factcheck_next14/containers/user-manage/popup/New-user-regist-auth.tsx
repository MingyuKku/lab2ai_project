'use client'

import React from 'react';
import Radio from '@/components/form/Radio';
import { RadioList } from '@/components/form/_types';
import { Authority } from '@/services/auth/_types';


interface Props {
    label: string;
    inputName: string;
    borderPos?: 'top' | 'bottom';
    inputRule?: string;
    inputClassName?: string;
}
const NewUserRegistAuth: React.FC<Props> = ({ label, inputName, borderPos, inputRule, inputClassName }) => {


    const ITEMS: RadioList[] = [
        {
            label: '일반',
            value: 'MEMBER'
        },
        {
            label: '관리자',
            value: 'ADMIN'
        },
    ]

    const [ checkedItem, updateItem ] = React.useState(ITEMS[0]);


    const borderStyleClassName = React.useMemo(() => {
        if (borderPos === 'top') return 'border border-achromatic-03 border-b-0'
        if (borderPos === 'bottom') return 'border border-achromatic-03'
        return 'border border-achromatic-03 border-b-0';
    }, [])
    
    return (
        <div className='flex items-center h-[72px]'>
            <div
                className={`
                    label min-w-[132px] h-full bg-achromatic-02 px-4
                    ${ borderStyleClassName }
                `}
            >
                <div className='title-sm text-achromatic-white leading-[72px]'>{ label }</div>
            </div>
            <div
                className={`
                    px-4 w-full h-full
                    ${ borderStyleClassName }
                `}
            >
                <div className='h-full flex items-center'>
                    <Radio
                        name='auth'
                        items={ ITEMS }
                        checkedItem={ checkedItem }
                        updateItem={ updateItem }
                        itemClassName='mr-9 last:mr-0'
                    />
                </div>
            </div>
        </div>
    )
}

export default NewUserRegistAuth;