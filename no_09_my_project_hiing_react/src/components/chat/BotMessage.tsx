import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectChatRoomInfo } from "_redux/chatInfo/selector";
import { AppDispatch } from "_redux/store";
import { setChatFeedbackModal } from "_redux/modal/slice";
import { messageMixpanel, messageWebview } from "hooks/useWebviewBridge";
import { ChatListClass, MessageListType } from "services/chat/_fetch/_types";

const IconBuzzer = React.lazy(() => import('icon/object/Buzzer'));

interface Props {
    item: ChatListClass;
    isLastItem?: boolean;
}


const BotMessage = ({ item, isLastItem }: Props) => {
    const { characterSe } = useParams();
    const { porofile_thumbnail_lk, character_nm } = useSelector(selectChatRoomInfo);
    const dispatch = useDispatch<AppDispatch>();
    
    const onClickFeedbackHandle = React.useCallback(() => {
        if (!character_nm) return;

        messageMixpanel({
            tracking_type: 'event',
            event_name: 'click_complain_chat',
            param: {
                'persona': character_nm,
            }
        })

        if (item.id) {
            dispatch(setChatFeedbackModal({
                modalFlag: true,
                chatId: item.id
            }));
        }

    }, [character_nm, item.id])

    const onClickThumbnail = React.useCallback(() => {
        if (!character_nm) return;
        
        messageMixpanel({
            tracking_type: 'event',
            event_name: 'click_character_profile',
            param: {
                'persona': character_nm,
            }
        })
    }, [character_nm])
    

    const bgImgStyle = React.useMemo(() => ({
        backgroundImage: `url(${porofile_thumbnail_lk})`
    }), [porofile_thumbnail_lk])

    if (item.message) {
        return (
            <div className="user-message-box flex mb-3">
                <Link
                    to={`/character/${characterSe}/profile`}
                    onClick={ onClickThumbnail }
                    className="thumb-image block shrink-0 w-9 h-9 rounded-full overflow-hidden mr-1 bg-center bg-no-repeat bg-size bg-cover"
                    style={ bgImgStyle }
                >
                </Link>
                <div className='flex flex-col mt-1.5 max-w-[242px]'>
                    <div className='self-start p-2.5 bg-white rounded-[18px] rounded-ss-md'>
                        <p className='break-words'>{ item.message }</p>
                    </div>
                </div>
                <div className="time self-end ml-1">
                    {
                        isLastItem &&
                        <div onClick={ onClickFeedbackHandle } className="buzzer-icon cursor-pointer w-4">
                            <React.Suspense><IconBuzzer /></React.Suspense>
                        </div>
                    }
                    <span className="font-pretendard leading-none text-[12px] text-gray-03">{ item.chatTimeText }</span>
                </div>
            </div>
        )

    } else {
        return <React.Fragment />
    }
}

export default BotMessage;
