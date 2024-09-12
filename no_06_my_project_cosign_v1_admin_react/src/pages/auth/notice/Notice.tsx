import React from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { GET_NOTICE_LIST } from 'constants/react-query-keys';
import { useCommonGetText } from 'hooks/_app/useGetText';
import { useTableStyle } from 'hooks/faq/useTableStyle';
import { useFetchNotice } from 'hooks/notice/useFetchNotice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NoticeTableTitle from 'components/notice/Table-Title';
import Button from 'components/common/button/Button';
import Paginate from 'components/common/paginate/Paginate';


const Notice = () => {

    const { search } = useLocation();
    const navigate = useNavigate();
    const { columnStyle } = useTableStyle();
    const { getList } = useFetchNotice();
    const { itemNo, createAtTextShort } = useCommonGetText();
    const page = Number(new URLSearchParams(search).get('page'));
    

    const { data: noticeList, status } = useQuery({
        queryKey: [GET_NOTICE_LIST, page], 
        queryFn: () => getList(page),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });


    const handlePageClick = React.useCallback(({ selected }: { selected: number }) => {
        if (page === selected) return;
        navigate(`/notice?page=${selected}`);
    }, [page])

    

    if (status === 'pending') {
        return <p>데이터 로딩중...</p>
    }

    if (status === 'error') {
        return <p>에러 발생!</p>
    }

    if (!noticeList || !noticeList.content) {
        return <p>데이터가 없어요!</p>
    }

    return (
        <div>
            <div className="sub-header flex items-center justify-between mb-space-bottom-sm">
                <Link to='/notice/regist' className='flex items-center justify-center w-32 rounded-md overflow-hidden'>
                    <Button label='공지사항 등록' />
                </Link>
            </div>
            <table className='border-collapse w-full'>
                <NoticeTableTitle />
                <tbody>
                    {
                        noticeList.content.map((item, idx) => (
                            <tr
                                key={ idx }
                                className='text-body-3r odd:bg-bg-gray-04 hover:bg-bg-gray-03'
                            >
                                <td>
                                    <Link to={ `/notice/${item.id}/update` } className='flex items-center justify-center px-1 min-w-14 h-12'>{ itemNo(noticeList.totalElements, noticeList.number, noticeList.size, idx) }</Link>
                                </td>
                                <td>
                                    <Link to={ `/notice/${item.id}/update` } className='flex items-center px-1 h-12'><span className='line-clamp-2'>{ item.title }</span></Link>
                                </td>
                                <td><Link to={ `/notice/${item.id}/update` } className='flex items-center justify-center px-1 h-12'>{ createAtTextShort(item.createdAt) }</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="paginatation-wrap flex items-center justify-center mt-space-top-lg">
                <Paginate
                    page={ page }
                    totalPages={ noticeList.totalPages }
                    onChangePage={ handlePageClick }
                />
            </div>
        </div>
    )
}

export default Notice
