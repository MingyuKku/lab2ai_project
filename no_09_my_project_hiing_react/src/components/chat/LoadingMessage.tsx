import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectChatRoomInfo } from "_redux/chatInfo/selector";

const MessageLoading = React.lazy(() => import('components/common/fallback/MessageLoading'));

interface Props {
    className?: string
}

const LoadingMessage = ({ className }: Props) => {
    const { characterSe } = useParams();
    const { porofile_thumbnail_lk } = useSelector(selectChatRoomInfo);
    
    return (
        <div className={`user-message-box relative z-[1] flex mb-3 ${className}`}>
            <Link to={`/character/${characterSe}/profile`} className="thumb-image block shrink-0 w-9 h-9 rounded-full overflow-hidden mr-1.5">
                <img
                    src={ porofile_thumbnail_lk }
                    alt="thumb"
                    width={36}
                    height={36}
                    loading="lazy"
                    className="h-full object-cover"
                />
            </Link>
            <div className='flex flex-col mt-1.5 max-w-[calc(100%-42px-34px-12px)]'>
                <div className='self-start p-2.5 bg-white rounded-[20px] rounded-ss-md'>
                    <MessageLoading />
                </div>
            </div>
        </div>
    )
}

export default LoadingMessage