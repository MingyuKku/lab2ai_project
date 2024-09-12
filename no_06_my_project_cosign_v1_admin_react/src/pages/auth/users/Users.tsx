import React from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { GET_USERS_COUNT } from 'constants/react-query-keys';
import { useFetchUsers } from 'hooks/users/useFetchUsers';
import CountTable from 'components/users/Count-table';
import ListTable from 'components/users/List-table';

const Users = () => {

    const { getPurchaseUsers } = useFetchUsers();

    const { data: usersInfo, status } = useQuery({
        queryKey: [GET_USERS_COUNT], 
        queryFn: () => getPurchaseUsers(),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });


    if (status === 'pending') {
        return <p>데이터 로딩중...</p>
    }

    if (status === 'error') {
        return <p>에러 발생!</p>
    }

    if (!usersInfo) {
        return <p>데이터가 없어요!</p>
    }

    return (
        <div>
            <CountTable usersInfo={ usersInfo } />
            <ListTable />
        </div>
    )
}

export default Users
