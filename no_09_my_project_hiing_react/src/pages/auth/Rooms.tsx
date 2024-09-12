import React from 'react'
import { messageMixpanel } from 'hooks/useWebviewBridge';
import Header from 'components/common/header/Header';
import PageLoading from 'components/common/fallback/PageLoading';
import ChatBackgroundImg from 'components/common/ui-ux/ChatBackgroundImg';


const ChatRoomList = React.lazy(() => import('components/rooms/ChatRoomList'));
const Ad = React.lazy(() => import('components/common/ad/Ad'));


const FallbackAd = () => {
    return (
        <div className='flex justify-center items-center h-[50px]'>
            <div className='loading-spin w-6 h-6 !border-[4px]'></div>
        </div>
    )
}

const Rooms = () => {

    React.useEffect(() => {
        messageMixpanel({
            tracking_type: 'event',
            event_name: 'view_chat',
        });

    }, [])
    
    return (
        <div className='chat-rooms-page relative bg-white pt-basic-header h-full'>
            <Header />
            {/* <div className='z-[1] min-h-[50px]'>
                <React.Suspense
                    fallback={ <FallbackAd /> }
                >
                    <Ad />
                </React.Suspense>
            </div> */}


            {/* <ChatBackgroundImg /> */}
            {/* <div className="top-title relative pt-basic-header px-3.5">
                <div className="title-bg-image absolute top-0 left-0 w-full h-full">
                    <img
                        src="https://d25qtvpmz7kl1a.cloudfront.net/chat/chat-room-list-title-bg.png"
                        alt="bg"
                        className='h-full object-cover'
                        width={360}
                        height={90}
                        loading='lazy'
                    />
                </div>
            </div> */}
            <React.Suspense fallback={ <PageLoading /> }>
                <ChatRoomList />
            </React.Suspense>
        </div>
    )
}

export default Rooms;