import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React from 'react'
import ReactPaginate from 'react-paginate';


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
        <ReactPaginate
            breakLabel="..."
            onPageChange={ handlePageClick }
            forcePage={ page ?? 0 }
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            pageCount={ totalPages }
            previousLabel={ <LeftOutlined /> }
            nextLabel={ <RightOutlined /> }
            // renderOnZeroPageCount={null}
            className='flex items-center text-body-2 font-normal border text-font-dark-01 border-border-gray-04 rounded-lg'
            pageLinkClassName='w-9 h-9 flex items-center justify-center border-r border-border-gray-04'
            previousLinkClassName='w-9 h-9 flex items-center justify-center border-r border-border-gray-04'
            nextLinkClassName='w-9 h-9 flex items-center justify-center'
            activeLinkClassName='bg-position-short text-font-white'
            breakLinkClassName='w-9 h-9 flex items-center justify-center border-r border-border-gray-04'
        />
    )
}

export default Paginate
