import React from 'react';
import { isIOS, isMobile } from 'react-device-detect';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectMember } from '_redux/member/selector';
import { AppDispatch } from '_redux/store';
import { initChatInfo, setChatInfo } from '_redux/chatInfo/slice';
import { selectRefreshToken } from '_redux/refreshToken/selector';
import { selectBasicModal, selectChatFeedbackModal } from '_redux/modal/selector';
import { messageMixpanel } from 'hooks/useWebviewBridge';
import { getRoomsInfo } from 'services/chat/_fetch/chatRoom';
import { bodyScrollControl } from 'utils';
import MessageArea from 'components/chat/MessageArea';
import ChatHeader from 'components/common/header/ChatHeader';
import Scrollbar from 'components/common/ui-ux/Scrollbar';

const FeedbackPopup = React.lazy(() => import('components/chat/popup/FeedbackPopup'));
const BasicModal = React.lazy(() => import('components/common/modal/Basic'));
const AlertPopup = React.lazy(() => import('components/common/popup/Alert'));


const Chat = () => {

    const [ serchParams ] = useSearchParams();
    const { se } = useSelector(selectMember);
    const token = useSelector(selectRefreshToken);
    const { basicModalFlag } = useSelector(selectBasicModal);
    const { modalFlag } = useSelector(selectChatFeedbackModal);
    const { characterSe } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    
    const chatElRef = React.useRef<HTMLDivElement>(null);
    // const resizeObserverTimer = React.useRef<NodeJS.Timeout>();
    // const mutationObserverDebouncingTimer = React.useRef<NodeJS.Timeout>();

    React.useEffect(() => {
        if (!characterSe) return;
        
        const getChatInfo = async () => {
            const res = await getRoomsInfo(se!, characterSe);
            if (res) {
                // console.log('채팅에서 셋', res)
                dispatch(setChatInfo(res));
                messageMixpanel({
                    tracking_type: 'event',
                    event_name: 'view_chat_room',
                    param: {
                        'persona': res.character_nm,
                        'location': serchParams.get('before_location') ?? ''
                    }
                })
                // 꺄악
            }
        }
        getChatInfo();

        if (isIOS && isMobile) {
            // bodyScrollControl(true);
        }
        

        // clean up
        return () => {
            dispatch(initChatInfo());

            if (isIOS && isMobile) {
                // bodyScrollControl(false);
            }
            // clearTimeout(resizeObserverTimer.current);
        }
    // }, [refreshRendering])
    }, [token])


    return (
        // <Scrollbar ref={ chatElRef } className='character-chat-page no-scrollbar relative pt-basic-header'>
        <Scrollbar ref={ chatElRef } className={`
            character-chat-page relative pt-basic-header
            ${ isIOS && 'h-viewScreen overflow-y-auto overscroll-contain scrolling-touch no-scrollbar' }
        `}>
        {/* <div ref={ chatElRef } className={`
            character-chat-page relative pt-basic-header
            ${ isIOS && 'h-viewScreen overflow-y-auto overscroll-contain scrolling-touch' }
        `}> */}
            {
                modalFlag &&
                <React.Suspense>
                    <FeedbackPopup iosMobileScrollRef={ chatElRef } />
                </React.Suspense>
            }
            {
                basicModalFlag &&
                <React.Suspense>
                    <BasicModal>
                        <AlertPopup />
                    </BasicModal>
                </React.Suspense>
            }
            <ChatHeader />
            <div className={`inner ${ isIOS && 'h-[calc(100%+1px)]' }`}>
                <MessageArea elRef={ chatElRef }  />
            </div>
        {/* </div> */}
        </Scrollbar>
    )
}

export default Chat;