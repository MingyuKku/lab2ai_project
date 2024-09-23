import React from 'react';
import ReactPaginate from 'react-paginate';
import Arrow from './icon/Arrow';


interface Props {
    page: number;
    totalPages: number;
    onChangePage: (selectedItem: { selected: number }) => void;
}

const Paginate: React.FC<Props> = ({ page, totalPages, onChangePage }) => {

    const handlePageClick = React.useCallback(({ selected }: { selected: number }) => {
        onChangePage({ selected })
    }, [page])
    
    return (
        <div className='flex items-center justify-center mt-8'>
            <ReactPaginate
                breakLabel="..."
                onPageChange={ handlePageClick }
                forcePage={ page ?? 0 }
                pageRangeDisplayed={4}
                marginPagesDisplayed={1}
                pageCount={ totalPages }
                previousLabel={ <Arrow /> }
                nextLabel={ <Arrow className='rotate-180' /> }
                // renderOnZeroPageCount={null}
                className='flex items-center'
                pageLinkClassName='w-6 h-6 flex items-center justify-center body-sm'
                previousLinkClassName='w-6 h-6 flex items-center justify-center'
                nextLinkClassName='w-6 h-6 flex items-center justify-center'
                activeLinkClassName=''
                breakLinkClassName='w-6 h-6 flex items-center justify-center'
            />
        </div>
        
    )
}

export default Paginate
