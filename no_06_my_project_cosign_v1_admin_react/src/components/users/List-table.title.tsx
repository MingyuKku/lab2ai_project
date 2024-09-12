const ListTableTitle = () => {
    return (
        <thead className='h-12 bg-bg-gray-02 border-b border-border-black'>
            <tr className=''>
                <th className='text-body-3'>닉네임</th>
                <th className='text-body-3'>성별</th>
                <th className='text-body-3'>생년</th>
                <th className='text-body-3'>플랫폼</th>
                <th className='text-body-3'>상품</th>
                <th className='text-body-3'>상태</th>
                <th className='text-body-3'>결제회차</th>
                <th className='text-body-3'>결제일</th>
                <th className='text-body-3'>만료 예정일</th>
            </tr>
        </thead>
    )
}

export default ListTableTitle;
