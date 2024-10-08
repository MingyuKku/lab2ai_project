import React from 'react';
import IconDoc1 from '@/components/icon/Doc-1';
import IconDocFormat from '@/components/icon/Doc-format';
import IconDoc2 from '@/components/icon/Doc-2';
import IconCalendar from '@/components/icon/Calendar';
import IconUser from '@/components/icon/User';
import IconWaste from '@/components/icon/Waste';


interface Props {

}

const TableHead: React.FC<Props> = () => {
    return (
        <thead>
            <tr className='h-[50px] bg-achromatic-02 text-achromatic-white'>
                <th className='px-4 border border-achromatic-03'><div className='flex items-center'><IconDoc1 /><span className='title-sm ml-2'>문서명</span></div></th>
                <th className='px-4 border border-achromatic-03'><div className='flex items-center justify-center'><IconUser /><span className='title-sm ml-2 whitespace-nowrap'>등록자</span></div></th>
                <th className='px-4 border border-achromatic-03'><div className='flex items-center justify-center'><IconDocFormat /><span className='title-sm ml-2 whitespace-nowrap'>포맷</span></div></th>
                <th className='px-4 border border-achromatic-03'><div className='flex items-center'><IconDoc2 /><span className='title-sm ml-2'>체크 결과</span></div></th>
                <th className='px-4 border border-achromatic-03'><div className='flex items-center'><IconCalendar /><span className='title-sm ml-2 whitespace-nowrap'>등록일</span></div></th>
                <th className='px-4 border border-achromatic-03'><div className='flex items-center justify-center'><span className='title-sm whitespace-nowrap'>문서 상태</span></div></th>
                <th className='px-4 border border-achromatic-03'><div className='flex items-center justify-center'><IconWaste /><span className='title-sm ml-2 whitespace-nowrap'>영구 삭제</span></div></th>
            </tr>
        </thead>
    )
}

export default TableHead;
