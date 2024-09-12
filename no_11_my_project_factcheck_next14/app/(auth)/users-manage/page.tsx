import React from 'react';
import TableHead from '@/containers/user-manage/Table-head';
import TableBody from '@/containers/user-manage/Table-body';
import RegistButton from '@/containers/user-manage/Regist-button';




const UsersManagePage = () => {

    return (
        <React.Fragment>
            <div className='px-side py-10'>
                <div className="head">
                    <h1 className='title-lg text-center'>사용자 관리</h1>
                    <RegistButton />
                </div>
                <div className='table-wrapper mt-5'>
                    <table className='border-collapse w-full'>
                        <TableHead />
                        <TableBody />
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UsersManagePage;
