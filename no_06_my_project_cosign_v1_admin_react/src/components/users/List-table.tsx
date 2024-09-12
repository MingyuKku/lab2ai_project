import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { GET_USERS_LIST } from 'constants/react-query-keys';
import { useFetchUsers } from 'hooks/users/useFetchUsers';
import ListTableTitle from './List-table.title';
import { DownloadOutlined } from '@ant-design/icons';
import { useGetText } from 'hooks/users/useGetText';
import Paginate from 'components/common/paginate/Paginate';

const ListTable = () => {

    const { search } = useLocation();
    const navigate = useNavigate();
    const page = Number(new URLSearchParams(search).get('page'));

    const { getUsersList, downloadCSV, } = useFetchUsers();
    const { genderText, birthdayText, roundNumberText, startDateTimeKst, endDateTimeKst,  } = useGetText();
    
    const { data: userList, status } = useQuery({
        queryKey: [GET_USERS_LIST, page], 
        queryFn: () => getUsersList(page),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });


    const handlePageClick = React.useCallback(({ selected }: { selected: number }) => {
        if (page === selected) return;
        navigate(`/users?page=${selected}`);
    }, [page])


    const downloadCsvFile = React.useCallback(async () => {
        const data = await downloadCSV();
        const BOM:Blob = new Blob(["\ufeff" + data], {type: "text/csv;charset=utf-8;"}) // \ufeff 를 넣은 이유 -> 한글깨짐 방지
        const url:string = window.URL.createObjectURL(BOM);
        const link = document.createElement("a") as HTMLAnchorElement;
        link.href = url;
        link.setAttribute('download', `유료 이용자 현황.csv`);
        link.click();
    }, [])



    if (status === 'pending') {
        return <p>데이터 로딩중...</p>
    }

    if (status === 'error') {
        return <p>에러 발생!</p>
    }

    if (!userList || !userList.content) {
        return <p>데이터가 없어요!</p>
    }

    return (
        <div className='mt-space-top-lg'>
            {
                userList.content.length > 0 &&
                <React.Fragment>
                    <div className='flex justify-end mb-space-top-sm'>
                        <div
                            className='flex items-center text-cap-2m text-font-dark-03 font-normal cursor-pointer'
                            onClick={ downloadCsvFile }
                        >
                            <span className='text-[14px]'><DownloadOutlined /></span>
                            <span className='ml-1'>엑셀 파일 다운로드</span>
                        </div>
                    </div>
                    <table className='border-collapse w-full'>
                        <ListTableTitle />
                        <tbody>
                            {
                                userList.content.map((item, idx) => (
                                    <tr
                                        key={ idx }
                                        className='text-body-3r odd:bg-bg-gray-04 hover:bg-bg-gray-03'
                                    >
                                        <td className='flex-1 shrink-0 text-center truncate'><Link to={ `/member/${item.userId}/update` } className='flex items-center justify-center px-1 h-12'></Link>{ item.nickName }</td>
                                        <td className='flex-1 shrink-0 text-center truncate'><Link to={ `/member/${item.userId}/update` } className='flex items-center justify-center px-1 h-12'></Link>{ genderText(item.gender) }</td>
                                        <td className='flex-1 shrink-0 text-center truncate'><Link to={ `/member/${item.userId}/update` } className='flex items-center justify-center px-1 h-12'></Link>{ birthdayText(item.birthday) }</td>
                                        <td className='flex-1 shrink-0 text-center truncate'><Link to={ `/member/${item.userId}/update` } className='flex items-center justify-center px-1 h-12'></Link>{ item.platform }</td>
                                        <td className='flex-1 shrink-0 text-center truncate'><Link to={ `/member/${item.userId}/update` } className='flex items-center justify-center px-1 h-12'></Link>{ item.passProductKoName }</td>
                                        <td className='flex-1 shrink-0 text-center truncate'><Link to={ `/member/${item.userId}/update` } className='flex items-center justify-center px-1 h-12'></Link>{ item.statusTypeKo }</td>
                                        <td className='flex-1 shrink-0 text-center truncate'><Link to={ `/member/${item.userId}/update` } className='flex items-center justify-center px-1 h-12'></Link>{ roundNumberText(item.roundNumber) }</td>
                                        <td className='flex-1 shrink-0 text-center truncate'><Link to={ `/member/${item.userId}/update` } className='flex items-center justify-center px-1 h-12'></Link>{ startDateTimeKst(item.startDateTime) }</td>
                                        <td className='flex-1 shrink-0 text-center truncate'><Link to={ `/member/${item.userId}/update` } className='flex items-center justify-center px-1 h-12'></Link>{ endDateTimeKst(item.endDateTime) }</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    
                    <div className="paginatation-wrap flex items-center justify-center mt-space-top-lg">
                        <Paginate
                            page={ page }
                            totalPages={ userList.totalPages }
                            onChangePage={ handlePageClick }
                        />
                    </div>
                </React.Fragment>
            }
        </div>
    )
}

export default ListTable;
