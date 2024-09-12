const MessageLoading = () => {
    return (
        <div className='flex items-center py-2'>
            <span className='w-1.5 h-1.5 rounded-full message-loading-1 bg-gray-01 opacity-30'></span>
            <span className='w-1.5 h-1.5 rounded-full message-loading-2 mx-2 bg-gray-01 opacity-50'></span>
            <span className='w-1.5 h-1.5 rounded-full message-loading-3 bg-gray-01'></span>
        </div>
    )
}

export default MessageLoading