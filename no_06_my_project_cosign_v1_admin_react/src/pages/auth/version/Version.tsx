import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import VersionTableTitle from 'components/version/Table-title';
import Button from 'components/common/button/Button';
import Select from 'components/common/select/Select';
import { GET_VERSION_HISTORY } from 'constants/react-query-keys';
import { SelectValue } from 'components/common/select/_types';
import Paginate from 'components/common/paginate/Paginate';
import { useCommonGetText } from 'hooks/_app/useGetText';
import { useGetText } from 'hooks/faq/useGetText';
import { FaqSortType } from 'hooks/faq/_types';
import { useFetchVersion } from 'hooks/version/useFetchVersion';
import { ProductionType } from 'constants/_types';
import { RadioList } from 'components/common/input/_types';
import Radio from 'components/common/input/Radio';
import { PlatformAllType } from 'hooks/version/_types';


const Version = () => {

    const { search } = useLocation();
    const navigate = useNavigate();
    const { getVersionHistory } = useFetchVersion();
    const { createAtTextFull } = useCommonGetText();
    const { categoryText } = useGetText();
    const page = Number(new URLSearchParams(search).get('page'));
    

    const appType: RadioList<PlatformAllType>[] = [
        {
            id: 'NON',
            label: '전체',
            value: 'NON',
        },
        {
            id: 'AOS',
            label: 'AOS',
            value: 'AOS',
        },
        {
            id: 'IOS',
            label: 'iOS',
            value: 'IOS',
        }
    ]
    
    const [ checkedItem, setCheckedItem ] = React.useState('NON');


    const { data: versionHistory, status } = useQuery({
        queryKey: [GET_VERSION_HISTORY, page, checkedItem], 
        queryFn: () => getVersionHistory(checkedItem, page),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });


    const handlePageClick = React.useCallback(({ selected }: { selected: number }) => {
        if (page === selected) return;
        navigate(`/version?page=${selected}`);
    }, [page])




    if (status === 'pending') {
        return <p>데이터 로딩중...</p>
    }

    if (status === 'error') {
        return <p>에러 발생!</p>
    }

    if (!versionHistory || !versionHistory.content) {
        return <p>데이터가 없어요!</p>
    }
    
    return (
        <div>
            <div className="sub-header flex items-center justify-between mb-space-bottom-sm">
                <Link to='/version/regist' className='flex items-center justify-center w-32 rounded-md overflow-hidden'>
                    <Button label='새 버전 등록' />
                </Link>
                <Radio
                    name='production-mode'
                    items={ appType }
                    checkedItem={ checkedItem }
                    updateItem={ setCheckedItem }
                />
            </div>
            <table className='border-collapse w-full'>
                <VersionTableTitle />
                <tbody>
                    {
                        versionHistory.content.map((item, idx) => (
                            <tr
                                key={ idx }
                                className='text-body-3r odd:bg-bg-gray-04 hover:bg-bg-gray-03'
                            >
                                    <td>
                                        <Link to={ `/version/${item.vcId}/update` } className='px-1 h-12 flex items-center justify-center'>{ item.platformType }</Link>
                                    </td>
                                    <td>
                                        <Link to={ `/version/${item.vcId}/update` } className='px-1 h-12 flex items-center justify-center'>{ item.version }</Link>
                                    </td>
                                    <td>
                                        <Link to={ `/version/${item.vcId}/update` } className='px-1 h-12 flex items-center justify-center'>{ item.updateStateTypeKor }</Link>
                                    </td>
                                    <td>
                                        <Link to={ `/version/${item.vcId}/update` } className='px-1 h-12 flex items-center justify-center'>{ item.memo }</Link>
                                    </td>
                                    <td>
                                        <Link to={ `/version/${item.vcId}/update` } className='px-1 h-12 flex items-center justify-center'>{ createAtTextFull(item.createdAt) }</Link>
                                    </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="paginatation-wrap flex items-center justify-center mt-space-top-lg">
                <Paginate
                    page={ page }
                    totalPages={ versionHistory.totalPages }
                    onChangePage={ handlePageClick }
                />
            </div>
        </div>
    )
}

export default Version;
