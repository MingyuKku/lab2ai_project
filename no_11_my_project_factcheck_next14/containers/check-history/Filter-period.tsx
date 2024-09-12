'use client'

import React from 'react';
import { DateRange } from 'react-date-range';
import ko from 'date-fns/locale/ko';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import IconCalendar from '@/components/icon/Calendar';
import { useRangeDateState } from '@/hooks/check-history/use-range-date-state';



const FilterPeriod = () => {

    const [ startDateText, setStartDateText ] = React.useState(new Date().format('yyyy.MM.dd'));
    const [ endDateText, setEndDateText ] = React.useState(new Date().format('yyyy.MM.dd'));
    const [ isOpen, setIsOpen ] = React.useState(false);

    const { rangeState, onChangDate } = useRangeDateState({
        setStartDateText,
        setEndDateText
    });
    
    return (
        <div className='relative period flex items-center ml-4'>
            <span className='body-sm-b'>기간</span>
            {
                isOpen && <div onClick={ () => setIsOpen(!isOpen) } className='modal fixed w-full h-viewScreen top-0 left-0'></div>
            }
            {
                isOpen && <DateRange
                    locale={ ko }
                    dateDisplayFormat='yyyy.MM.dd'
                    editableDateInputs={ true }
                    onChange={ onChangDate }
                    moveRangeOnFirstSelection={ false }
                    ranges={ rangeState }
                    showMonthAndYearPickers={ false }
                    showDateDisplay={ false }
                    className='absolute top-full translate-y-1 left-0 shadow-02'
                    preventSnapRefocus={ true }
                    // navigatorRenderer={ () => {} }
                    // dayContentRenderer={  }
                />
            }
            <div
                onClick={ () => setIsOpen(!isOpen) }
                className={`
                    flex items-center h-8 rounded-[1px] bg-achromatic-white border border-achromatic-03 px-2 ml-2
                    ${ isOpen ? 'border-primary-blue shadow-blue-01 transition-shadow duration-200 ease-in-out' : '' }
                `}>
                <div className='start-date-picker flex items-center'>
                    <span className='body-sm'>{ startDateText }</span>
                    {/* <label htmlFor='start-date'><IconCalendar /></label> */}
                </div>
                <span className='title-sm px-2.5'>~</span>
                <div className='start-date-picker flex items-center'>

                    <span className='body-sm'>{ endDateText }</span>
                </div>
                <span className='ml-2.5'><IconCalendar color='black' /></span>
            </div>
            
        </div>
    )
}

export default FilterPeriod;
