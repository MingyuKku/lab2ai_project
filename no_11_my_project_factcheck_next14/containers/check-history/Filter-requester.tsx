'use client'

import { SelectList } from '@/components/form/_types';
import Select from '@/components/form/Select';
import { User } from '@/hooks/user-manage/_types';
import { GET_MEMBER_NAME_LIST } from '@/lib/swr/keys';
import { useFetchCheckHistory } from '@/services/check-history/use-fetch-check-history';
import React from 'react';
import useSWR from 'swr';



const LIST: User[] = [
    {
        name: '홍길동',
        id: 'abcd123',
        email: 'hong@korea.com',
        auth: 'admin',
        createAt: '2024.07.23',
    },
    {
        name: '김영수',
        id: 'fjkdie',
        email: 'kim@korea.com',
        auth: 'normal',
        createAt: '2024.06.22',
    },
    {
        name: '박영희',
        id: 'park',
        email: 'park@korea.com',
        auth: 'normal',
        createAt: '2024.05.11',
    },
    {
        name: '최민수',
        id: 'choe',
        email: 'choe@korea.com',
        auth: 'normal',
        createAt: '2024.05.14',
    },
    {
        name: '이동수',
        id: 'lee',
        email: 'lee@korea.com',
        auth: 'normal',
        createAt: '2024.05.15',
    },
    {
        name: '정광수',
        id: 'jeong',
        email: 'jeong@korea.com',
        auth: 'normal',
        createAt: '2024.05.17',
    },
    {
        name: '강영철',
        id: 'kang',
        email: 'kang@korea.com',
        auth: 'normal',
        createAt: '2024.05.18',
    },
    {
        name: '조영호',
        id: 'cho',
        email: 'cho@korea.com',
        auth: 'normal',
        createAt: '2024.05.20',
    },
    {
        name: '윤영식',
        id: 'yoon',
        email: 'yoon@korea.com',
        auth: 'normal',
        createAt: '2024.05.21',
    },
    {
        name: '장상철',
        id: 'jang',
        email: 'jang@korea.com',
        auth: 'normal',
        createAt: '2024.05.21',
    },
]

const FilterRequester = () => {


    const { getMemberNameList } = useFetchCheckHistory();
    // const { data, error, isLoading, isValidating } = useSWR(GET_MEMBER_NAME_LIST, getMemberNameList, {
    //     revalidateOnFocus: true,
    //     // refreshInterval: 1000 * 60,
    // })
    

    const [ items, setItems ] = React.useState<SelectList<string>[]>([]);
    const [ selectedItem, changeSelectItem ] = React.useState<SelectList<string>>();
    

    React.useEffect(() => {

        const fetchGetMemberNameList = async () => {
            const res = await getMemberNameList();

            if (res) {
                // setItems(res);

            }
            console.log('응답', res)
        }

        fetchGetMemberNameList();
    }, [])
    // // 임시 로직
    // React.useEffect(() => {
    //     if (!window || window.sessionStorage.getItem('test-user-list')) return;

    //     window.sessionStorage.setItem('test-user-list', JSON.stringify(LIST));
    // }, [])


    // React.useEffect(() => {
    //     // 임시 로직
    //     if (!window) return;
        
    //     const items = window.sessionStorage.getItem('test-user-list');
    //     if (!items) return;

    //     const parseItem = JSON.parse(items) as User[];
    //     const newItems = parseItem.map((item) => ({
    //         key: item.id,
    //         label: item.name
    //     }))

    //     setItems(newItems);
    //     changeSelectItem(newItems[0])

    // }, [])



    // if (error) {
    //     return <p>에러 발생!</p>
    // }
    
    return (
        <div className='period flex items-center'>
            <span className='body-sm-b'>요청자</span>
            <div className='ml-2'>
                <Select items={ items } selectedItem={ selectedItem } changeSelectItem={ changeSelectItem } />
                
            </div>
            {/* <input type="file" onChange={ onUploadFile } /> */}
        </div>
    )
}

export default FilterRequester;
