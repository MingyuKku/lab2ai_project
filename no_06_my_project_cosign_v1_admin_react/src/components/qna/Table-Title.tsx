
const TableTitle = () => {

    return (
        <thead className='h-12 bg-bg-gray-02 border-b border-border-black'>
            <tr className=''>
                <th className='text-body-3'>구분</th>
                <th className='text-body-3'>이메일</th>
                <th className='text-body-3'>내용</th>
                <th className='text-body-3'>등록일</th>
                <th className='text-body-3'>답변상태</th>
            </tr>
        </thead>
    )
}

export default TableTitle;
