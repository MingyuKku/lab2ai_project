import React from 'react'
import { isDesktop, isIOS, isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { setChatFeedbackModal } from '_redux/modal/slice';
import { AppDispatch } from '_redux/store';
import { selectChatRoomInfo } from '_redux/chatInfo/selector';
import { messageMixpanel } from 'hooks/useWebviewBridge';
import PopupContent from './PopupContent';
import { touchmovePreventHandler } from 'utils';

interface Props {
    iosMobileScrollRef: React.RefObject<HTMLDivElement>;
}

const FeedbackPopup = ({ iosMobileScrollRef }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { character_nm } = useSelector(selectChatRoomInfo)

    const onClickModalHandle = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        const curTarget = e.currentTarget as HTMLElement;
        if (target === curTarget) {
            dispatch(setChatFeedbackModal({
                modalFlag: false
            }));
        }
        
    }, [])

    React.useEffect(() => {
        if (!character_nm) return;

        messageMixpanel({
            tracking_type: 'event',
            event_name: 'view_complain_chat',
            param: {
                'persona': character_nm,
            }
        })

        return () => {
            dispatch(setChatFeedbackModal({
                modalFlag: false
            }));
            if (isIOS) {
                document.documentElement.removeEventListener('touchmove', touchmovePreventHandler);
            }
        }
    }, [character_nm])


    return (
        <div onClick={ onClickModalHandle } className='fixed top-0 left-0 z-50 w-full h-full bg-gray-01 bg-opacity-60'>
            <div className={`
                absolute bottom-0 x-center bg-white p-5 rounded-t-[20px]
                ${isDesktop ? 'w-desktop' : 'w-full max-w-desktop'}
            `}>
                <PopupContent iosMobileScrollRef={ iosMobileScrollRef } />
            </div>
        </div>
    )
}

export default FeedbackPopup;  