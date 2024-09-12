import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import FaqTableTitle from './Faq-table-title';
import Button from 'components/common/button/Button';
import Select from 'components/common/select/Select';
import { GET_FAQ_LIST } from 'constants/react-query-keys';
import { SelectValue } from 'components/common/select/_types';
import Paginate from 'components/common/paginate/Paginate';
import { useFetchFaq } from 'hooks/faq/useFetchFaq';
import { useCommonGetText } from 'hooks/_app/useGetText';
import { useGetText } from 'hooks/faq/useGetText';
import { FaqSortType } from 'hooks/faq/_types';


const FaqTable = () => {

    const { search } = useLocation();
    const navigate = useNavigate();
    // const { columnStyle } = useTableStyle();
    const { getList } = useFetchFaq();
    const { createAtTextFull } = useCommonGetText();
    const { categoryText } = useGetText();
    const page = Number(new URLSearchParams(search).get('page'));


    const SELECT_VALUES: SelectValue<FaqSortType>[] = [
        {
            key: 'latest',
            label: '최신순'
        },
        {
            key: 'views',
            label: '조회순',
        }
    ]

    // const [ selectValueIndex, setSelectValueIndex ] = React.useState(0);
    const [ selectedItem, setSelecItem ] = React.useState<SelectValue<FaqSortType> | undefined>(SELECT_VALUES[0]);


    const { data: faqData, status } = useQuery({
        queryKey: [GET_FAQ_LIST, page, selectedItem?.key], 
        queryFn: () => getList(selectedItem?.key, page),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });


    const handlePageClick = React.useCallback(({ selected }: { selected: number }) => {
        if (page === selected) return;
        navigate(`/faq?page=${selected}`);
    }, [page])



    if (status === 'pending') {
        return <p>데이터 로딩중...</p>
    }

    if (status === 'error') {
        return <p>에러 발생!</p>
    }

    if (!faqData || !faqData.content) {
        return <p>데이터가 없어요!</p>
    }

    return (
        <div>
            <div className="sub-header flex items-center justify-between mb-space-bottom-sm">
                <Link to='/faq/regist' className='flex items-center justify-center w-32 rounded-md overflow-hidden'>
                    <Button label='새 게시글 등록' />
                </Link>
                <Select<FaqSortType>
                    values={ SELECT_VALUES }
                    selectedItem={ selectedItem }
                    changeSelect={ setSelecItem }
                />
            </div>
            <table className='border-collapse w-full'>
                <FaqTableTitle />
                <tbody>
                    {
                        faqData.content.map((item, idx) => (
                            <tr
                                key={ idx }
                                className='text-body-3r odd:bg-bg-gray-04 hover:bg-bg-gray-03'
                            >
                                    <td>
                                        <Link to={ `/faq/${item.id}/update` } className='px-1 h-12 flex items-center justify-center'>{ categoryText(item.categoryType) }</Link>
                                    </td>
                                    <td>
                                        <Link to={ `/faq/${item.id}/update` } className='px-1 h-12 flex items-center'><span className='line-clamp-2'>{ item.title }</span></Link>
                                    </td>
                                    <td>
                                        <Link to={ `/faq/${item.id}/update` } className='px-1 h-12 flex items-center justify-center'>{ createAtTextFull(item.createdAt) }</Link>
                                    </td>
                                    <td>
                                        <Link to={ `/faq/${item.id}/update` } className='px-1 h-12 flex items-center justify-center'>{ item.count }</Link>
                                    </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="paginatation-wrap flex items-center justify-center mt-space-top-lg">
                <Paginate
                    page={ page }
                    totalPages={ faqData.totalPages }
                    onChangePage={ handlePageClick }
                />
            </div>
        </div>
    )
}

export default FaqTable;
