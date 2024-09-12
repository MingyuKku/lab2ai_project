import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GET_MEMBER_LIST } from 'constants/react-query-keys';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useFetchMember } from 'hooks/member/useFetchMember';
import MemberTableTitle from 'components/member/Table-Title';
import { useCommonGetText } from 'hooks/_app/useGetText';
import Paginate from 'components/common/paginate/Paginate';
import SearchBar from 'components/member/Search-bar';
import { MemberFetchPathParamType } from 'hooks/member/_types';


const Member = () => {

    const { search } = useLocation();
    const navigate = useNavigate();
    const page = Number(new URLSearchParams(search).get('page'));
    
    const { itemNo, createAtTextFull } = useCommonGetText();
    const { getList } = useFetchMember();

    const [ queryKeyState, setQueryKeyState ] = React.useState<{
        key: MemberFetchPathParamType;
        keyword: string;
    } | undefined>();

    const { data: memberList, status } = useQuery({
        queryKey: [GET_MEMBER_LIST, page, queryKeyState], 
        queryFn: () => getList(page, queryKeyState?.key, queryKeyState?.keyword),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });


    const handlePageClick = React.useCallback(({ selected }: { selected: number }) => {
        if (page === selected) return;
        navigate(`/member?page=${selected}`);
    }, [page])
    


    if (status === 'pending') {
        return <p>데이터 로딩중...</p>
    }

    if (status === 'error') {
        return <p>에러 발생!</p>
    }

    if (!memberList || !memberList.content) {
        return <p>데이터가 없어요!</p>
    }

    return (
        <div>
            <div className="search-area flex items-center justify-center pb-space-bottom-md">
                <SearchBar changeFetchKey={ setQueryKeyState } />
            </div>
            <table className='border-collapse w-full'>
                <MemberTableTitle />
                <tbody>
                    {
                        memberList.content.map((item, idx) => (
                            <tr
                                key={ idx }
                                className='text-body-3r odd:bg-bg-gray-04 hover:bg-bg-gray-03'
                            >
                                <td><Link to={ `/member/${item.userId}/update` } className='flex items-center justify-center px-1 min-w-14 h-12'>{ itemNo(memberList.totalElements, memberList.number, memberList.size, idx) }</Link></td>
                                <td><Link to={ `/member/${item.userId}/update` } className='flex items-center justify-center px-1 min-w-24 h-12 break-all'>{ item.email }</Link></td>
                                <td><Link to={ `/member/${item.userId}/update` } className='flex items-center justify-center px-1 min-w-16 h-12'>{ item.nickName }</Link></td>
                                <td><Link to={ `/member/${item.userId}/update` } className='flex items-center justify-center px-1 h-12'>{ createAtTextFull(item.createdAt) }</Link></td>
                                <td><Link to={ `/member/${item.userId}/update` } className='flex items-center justify-center px-1 h-12'>{ item.name }</Link></td>
                                <td><Link to={ `/member/${item.userId}/update` } className='flex items-center justify-center px-1 h-12'>{ item.cellphoneNo }</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="paginatation-wrap flex items-center justify-center mt-space-top-lg">
                <Paginate
                    page={ page }
                    totalPages={ memberList.totalPages }
                    onChangePage={ handlePageClick }
                />
            </div>
        </div>
    )
}

export default Member;
