import { TotalUserInfoRes } from 'hooks/users/_types';
import React from 'react'


interface Props {
    usersInfo: TotalUserInfoRes | null;
}
const CountTable: React.FC<Props> = ({ usersInfo }) => {
    if (!usersInfo) return <></>

    return (
        <div className='text-body-3r border border-border-gray-03'>
            <li className='flex items-center p-3 border-b border-border-gray-03'>
                <span className='w-1 h-1 rounded-full bg-bg-black'></span>
                <p className='ml-1'>총 유료 사용자: { usersInfo.totalPurchaseOrderUser }명</p>
                <p className='ml-8'>* 총 회원 수: { usersInfo.totalUserCount }명</p>
            </li>
            <li className='flex items-center p-3 border-b border-border-gray-03'>
                <span className='w-1 h-1 rounded-full bg-bg-black'></span>
                <p className='ml-1'>AOS: { usersInfo.aosTotalPurchaseOrderUser }명 (정기: { usersInfo.aosRegularOrderUser }명 / 단건: { usersInfo.aosSingleOrderUser }명)</p>
                <p className='ml-8'>* iOS: { usersInfo.iosTotalPurchaseOrderUser }명 (정기: { usersInfo.iosRegularOrderUser }명 / 단건: { usersInfo.iosSingleOrderUser }명)</p>
            </li>
            <li className='flex items-center p-3'>
                <span className='w-1 h-1 rounded-full bg-bg-black'></span>
                <p className='ml-1'>정기결제: { usersInfo.totalRegularOrderUser }명 (AOS: { usersInfo.aosRegularOrderUser }명 / iOS: { usersInfo.iosRegularOrderUser }명)</p>
                <p className='ml-8'>* 단건결제: { usersInfo.totalSingleOrderUser }명 (AOS: { usersInfo.aosSingleOrderUser }명 / iOS: { usersInfo.iosSingleOrderUser }명)</p>
            </li>
        </div>
    )
}

export default CountTable;
