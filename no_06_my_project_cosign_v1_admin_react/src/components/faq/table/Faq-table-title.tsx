
const FaqTableTitle = () => {

    return (
        <thead className='h-12 bg-bg-gray-02 border-b border-border-black'>
            <tr className=''>
                <th className='text-body-3'>카테고리</th>
                <th className='text-body-3'>제목</th>
                <th className='text-body-3'>등록일시</th>
                <th className='text-body-3'>조회수</th>
            </tr>
        </thead>
        // <div className='flex items-center h-12 text-body-3 bg-bg-gray-02 border-b border-border-black'>
        //     <div className='text-center' style={ columnStyle }>카테고리</div>
        //     <div className='flex-1 min-w-[200px] text-center'>제목</div>
        //     <div className='text-center' style={ columnStyle }>등록일시</div>
        //     <div className='text-center' style={ columnStyle }>조회수</div>
        // </div>
    )
}

export default FaqTableTitle;
