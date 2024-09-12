import React from 'react'

const TableTitle = () => {
    return (
        <thead className='h-12 bg-bg-gray-02 border-b border-border-black'>
            <tr className=''>
                <th className='text-body-3'>플랫폼</th>
                <th className='text-body-3'>버전</th>
                <th className='text-body-3'>업데이트 타입</th>
                <th className='text-body-3'>업데이트 내용</th>
                <th className='text-body-3'>릴리즈 일시</th>
            </tr>
        </thead>
    )
}

export default TableTitle;
