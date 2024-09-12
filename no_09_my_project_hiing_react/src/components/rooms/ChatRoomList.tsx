import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { selectMember } from '_redux/member/selector';
import { messageMixpanel, messageWebview } from 'hooks/useWebviewBridge';
import { getRoomsList, ChatRoomListClass } from 'services/chat/_fetch/chat';
import ChatBackgroundImg from 'components/common/ui-ux/ChatBackgroundImg';
import ErrorFallback from 'components/error/ErrorFallback';
import PageLoading from 'components/common/fallback/PageLoading';


const RedDot = React.lazy(() => import('components/common/ui-ux/RedDot'));


const ChatRoomList = () => {
    const navigate = useNavigate();
    // const { socket } = useSocketContext();
    const { se } = useSelector(selectMember);

    const INDEX_KEY: QueryKey = ['chat-room-list'];

    const { data: chatRoomList, isLoading, isFetching, error } = useQuery({
        queryKey: INDEX_KEY,
        queryFn: () => getRoomsList(se!),
        // staleTime: 1000 * 3 // 15초
    })
    

    const onClickThumbImg = (event: React.MouseEvent<HTMLElement>, character_se: number, character_nm: string) => {
        event.preventDefault();
        event.stopPropagation();

        messageMixpanel({
            tracking_type: 'event',
            event_name: 'click_character_profile',
            param: {
                'persona': character_nm,
            }
        })
        
        navigate(`/character/${character_se}/profile`);
    }


    const onClickChatRoom = React.useCallback((character_nm: string) => {
        return () => {
            messageMixpanel({
                tracking_type: 'event',
                event_name: 'click_chat_room',
                param: {
                    'persona': character_nm,
                    'location': '채팅리스트화면'
                }
            });
        }
    }, [])



    if (error) {
        return <ErrorFallback error={ error } />
    }

    if (isLoading || isFetching || chatRoomList === undefined) {
        return <PageLoading />
    } else if (chatRoomList === null || chatRoomList.length <= 0) {
        return (
            <div className='no-items fixed top-0 w-full max-w-desktop h-full flex items-center justify-center flex-col'>
                <div className="bg-image w-[164px]">
                    <img
                        src="https://d25qtvpmz7kl1a.cloudfront.net/chat/img-emptyset.png"
                        alt="bg"
                        width={164} height={164}
                        loading='lazy'
                    />
                </div>
                <p className='text-[15px] mt-4 text-gray-04 font-semibold'>아직 대화가 없어요</p>
            </div>
        )
    }

    return (
        <div className=''>
            <ChatBackgroundImg bgImageUrl='https://d25qtvpmz7kl1a.cloudfront.net/chat/chat-room-bg.png' lazy={ false } />
            <ul className='relative z-[1]'>
                {
                    chatRoomList.map((item, idx) => (
                        <li key={ idx } className='list px-3.5 hover:bg-button-press hover:bg-opacity-20'>
                            <Link
                                to={`/chat/${item.character_se}?before_location=채팅리스트화면`}
                                onClick={ onClickChatRoom(item.character_nm) }
                                className='flex items-center justify-between py-[20px] border-b-[1px] border-gray-05'
                            >
                                <div className='left-content flex items-center'>
                                    <div
                                        onClick={ (e) => onClickThumbImg(e, item.character_se, item.character_nm) }
                                        className="thumb-img w-[46px] h-[46px] rounded-full flex justify-center items-center shrink-0 overflow-hidden mr-3.5"
                                    >
                                        <img
                                            src={ process.env.REACT_APP_IMAGE_URL + item.porofile_thumbnail_lk } alt="thumb"
                                            width={46}
                                            height={46}
                                            loading='lazy'
                                            className='h-full object-cover'
                                        />
                                    </div>
                                    <div className="desc text-gray-02">
                                        <div className='relative inline-block'>
                                            <h1 className='text-[18px] font-medium text-justify break-all leading-none'>{ item.character_nm }</h1>
                                            {
                                                item.redDot &&
                                                <React.Suspense><RedDot /></React.Suspense>
                                            }
                                        </div>
                                        <p className='text-[13px] line-clamp-1'>{ item.last_chat }</p>
                                    </div>
                                </div>
                                <div className="right-content ml-3.5">
                                    <p className='font-pretendard text-[11px] text-gray-03'>{ item.last_chat_time_format }</p>
                                </div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ChatRoomList;