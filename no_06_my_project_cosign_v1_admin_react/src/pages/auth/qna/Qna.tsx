import React from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { GET_QNA_LIST } from 'constants/react-query-keys';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCommonGetText } from 'hooks/_app/useGetText';
import { useGetText } from 'hooks/notice/useGetText';
import QnaTableTitle from 'components/qna/Table-Title';
import Paginate from 'components/common/paginate/Paginate';
import { useFetchQna } from 'hooks/qna/useFetchQna';


const Qna = () => {

    const { search } = useLocation();
    const navigate = useNavigate();
    const { getList } = useFetchQna();
    const { createAtTextShort } = useCommonGetText();
    const { answerText } = useGetText();
    const page = Number(new URLSearchParams(search).get('page'));
    

    const { data: qnaList, status } = useQuery({
        queryKey: [GET_QNA_LIST, page], 
        queryFn: () => getList(page),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });


    const handlePageClick = React.useCallback(({ selected }: { selected: number }) => {
        if (page === selected) return;
        navigate(`/qna?page=${selected}`);
    }, [page])

    

    if (status === 'pending') {
        return <p>데이터 로딩중...</p>
    }

    if (status === 'error') {
        return <p>에러 발생!</p>
    }

    if (!qnaList || !qnaList.content) {
        return <p>데이터가 없어요!</p>
    }

    return (
        <div>
            <table className='border-collapse w-full'>
                <QnaTableTitle />
                <tbody>
                    {
                        qnaList.content.map((item, idx) => (
                            <tr
                                key={ idx }
                                className='text-body-3r odd:bg-bg-gray-04 hover:bg-bg-gray-03'
                            >
                                <td>
                                    <Link to={ `/qna/${item.id}` } className='flex items-center justify-center min-w-14 h-12'>{ item.memberDivision }</Link>
                                </td>
                                <td>
                                    <Link to={ `/qna/${item.id}` } className='flex items-center justify-center min-w-24 h-12 break-all'>{ item.email }</Link>
                                </td>
                                <td>
                                    <Link to={ `/qna/${item.id}` } className='flex items-center h-12'><span className='line-clamp-2'>{ item.content }</span></Link>
                                </td>
                                <td>
                                    <Link to={ `/qna/${item.id}` } className='flex items-center justify-center min-w-20 h-12'>{ createAtTextShort(item.createdAt) }</Link>
                                </td>
                                <td
                                    className={`${ item.answerCk ? '' : 'text-position-short' }`}
                                >
                                    <Link to={ `/qna/${item.id}` } className='flex items-center justify-center min-w-16 h-12'>{ answerText(item.answerCk) }</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            

            <div className="paginatation-wrap flex items-center justify-center mt-space-top-lg">
                <Paginate
                    page={ page }
                    totalPages={ qnaList.totalPages }
                    onChangePage={ handlePageClick }
                />
            </div>
        </div>
    )
}

export default Qna
