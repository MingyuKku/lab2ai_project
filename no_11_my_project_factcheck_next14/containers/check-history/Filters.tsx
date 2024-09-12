import React from 'react'
import FilterRequester from './Filter-requester';
import FilterPeriod from './Filter-period';
import KeywordSearch from './Keyword-search';


interface Props {

}

const Filters: React.FC<Props> = () => {
    return (
        <div className='mt-5'>
            <form action="post" className='flex items-center'>
                <FilterRequester />
                <FilterPeriod />
                <KeywordSearch />
                <button type='submit' className='none-st w-[50px] h-8 body-sm bg-achromatic-white border-[1.5px] border-achromatic-black rounded ml-2'>검색</button>
            </form>
        </div>
    )
}

export default Filters;
