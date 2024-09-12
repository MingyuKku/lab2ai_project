import React from 'react';
import IconUser from '@/components/icon/User';
import IconId from '@/components/icon/Id';
import IconEmail from '@/components/icon/Email';
import IconAuth from '@/components/icon/Auth';
import IconCalendar from '@/components/icon/Calendar';
import IconKey from '@/components/icon/Key';
import IconDelete from '@/components/icon/Delete';


interface Props {

}

const TableHead: React.FC<Props> = () => {
    return (
        <thead>
            <tr className='h-[50px] bg-achromatic-02 text-achromatic-white'>
                <th className='px-4 border border-achromatic-03'><div className='flex items-center'><IconUser /><span className='title-sm ml-2'>이름</span></div></th>
                <th className='px-4 border border-achromatic-03'><div className='flex items-center'><IconId /><span className='title-sm ml-2'>아이디</span></div></th>
                <th className='px-4 border border-achromatic-03'><div className='flex items-center'><IconEmail /><span className='title-sm ml-2'>이메일</span></div></th>
                <th className='px-4 border border-achromatic-03'><div className='flex items-center justify-center'><IconAuth /><span className='title-sm ml-2'>권한</span></div></th>
                <th className='px-4 border border-achromatic-03'><div className='flex items-center justify-center'><IconCalendar /><span className='title-sm ml-2'>가입일</span></div></th>
                <th className='px-4 border border-achromatic-03'><div className='flex items-center justify-center'><IconKey /><span className='title-sm ml-2'>비번 초기화</span></div></th>
                <th className='px-4 border border-achromatic-03'><div className='flex items-center justify-center'><IconDelete /><span className='title-sm ml-2'>사용자 삭제</span></div></th>
            </tr>
        </thead>
    )
}

export default TableHead;
