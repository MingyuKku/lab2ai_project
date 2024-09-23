'use client'

import React from 'react';
import ButtonSs from '@/components/buttons/Button-ss';
// import { USERS } from './user-table';

import { User } from '@/hooks/user-manage/_types';
import { useClickButtons } from '@/hooks/user-manage/use-click-buttons';
import Link from 'next/link';


interface Props {}

const TableBody: React.FC<Props> = () => {

    const { onClickDelete, onClickResetPw } = useClickButtons();
    


    return (
        <tbody className='bg-achromatic-white'>
            <tr
                className='h-[50px]'
            >
                <td className='border border-achromatic-03'>
                    <Link
                        href={ `/data-bank/${'1'}` }
                        // onClick={ () => isCompleted(item.docsStatus) ? undefined : openWaitAlert() }
                        scroll={ false }
                        className='flex items-center px-4 h-[50px] body-md'
                    >
                        <span className='line-clamp-2'>한국 경제 전망</span>
                    </Link></td>
                <td className='px-4 border border-achromatic-03 w-[120px]'><div className='body-sm text-center'>홍길동</div></td>
                <td className='px-4 border border-achromatic-03 w-[120px]'><div className='body-sm text-center'>URL</div></td>
                <td className='px-4 border border-achromatic-03 w-[150px]'><div className={`body-sm text-center`}>2024.04.24 23:24</div></td>
                <td className='px-4 border border-achromatic-03 w-[180px]'>
                    <div className='flex items-center justify-center'>
                        <ButtonSs
                            label='삭제'
                            buttonType='cancle' className='w-[47px]'
                            onClick={ onClickDelete }
                        />
                    </div>
                </td>
            </tr>
            
        </tbody>
    )
}

export default TableBody;
