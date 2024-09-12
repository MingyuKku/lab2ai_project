'use client'

import React from 'react';
import ButtonSs from '@/components/buttons/Button-ss';
// import { USERS } from './user-table';

import { User } from '@/hooks/user-manage/_types';
import { useClickButtons } from '@/hooks/user-manage/use-click-buttons';


interface Props {}

const TableBody: React.FC<Props> = () => {

    const { onClickDelete, onClickResetPw } = useClickButtons();
    
    // 임시 로직
    const [ users, setUsers ] = React.useState<User[]>([]);
    React.useEffect(() => {
        if (!window) return;

        const items = window.sessionStorage.getItem('test-user-list');
        if (!items) return;
        const list = JSON.parse(items) as User[];
        setUsers(list);
    }, [])



    return (
        <tbody className='bg-achromatic-white'>
            {
                users.map((user,idx) => (
                    <tr
                        key={ idx }
                        className='h-[50px]'
                    >
                        <td className='px-4 border border-achromatic-03'><div className='body-md'>{ user.name }</div></td>
                        <td className='px-4 border border-achromatic-03'><div className='body-md'>{ user.id }</div></td>
                        <td className='px-4 border border-achromatic-03'><div className='body-md'>{ user.email }</div></td>
                        <td className='px-4 border border-achromatic-03'><div className={`body-md text-center ${ user.auth === 'admin' ? 'text-primary-blue' : '' }`}>{ user.auth === 'admin' ? '관리자' : '일반' }</div></td>
                        <td className='px-4 border border-achromatic-03'><div className='body-sm text-center'>{ user.createAt }</div></td>
                        <td className='px-4 border border-achromatic-03'>
                            <div className='flex items-center justify-center'>
                                <ButtonSs
                                    label='초기화'
                                    buttonType='cancle'
                                    onClick={ onClickResetPw }
                                    className='w-[58px]'
                                />
                            </div>
                        </td>
                        <td className='px-4 border border-achromatic-03'>
                            <div className='flex items-center justify-center'>
                                <ButtonSs
                                    label='삭제'
                                    buttonType='cancle' className='w-[47px]'
                                    onClick={ onClickDelete }
                                />
                            </div>
                        </td>
                    </tr>
                ))
            }
            
        </tbody>
    )
}

export default TableBody;
