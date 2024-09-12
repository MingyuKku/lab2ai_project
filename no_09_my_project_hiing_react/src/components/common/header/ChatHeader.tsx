import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectChatRoomInfo } from '_redux/chatInfo/selector';
import { isDesktop } from 'react-device-detect';
import { messageWebview } from 'hooks/useWebviewBridge';

// lazy 컴포넌트
const IconArrowAngle = React.lazy(() => import('icon/arrow/Angle'));

interface Props {
    position?: 'fixed' | 'absolute' | 'sticky';
}

const ChatHeader = React.forwardRef<HTMLDivElement, Props>(({ position }: Props, ref) => {
    const navigate = useNavigate();
    const { character_nm, dday } = useSelector(selectChatRoomInfo);

    const onClickBackHandle = React.useCallback(() => {
        navigate(-1);
        // messageWebview({
        //     type: 'pop',
        // })
    }, [])

    return (
        <div ref={ ref } className={`
            ${ position ?? 'fixed' }
            chat-header-wrap top-0 z-40 flex items-center justify-between h-basic-header px-[22px] bg-[#FFF3E8] bg-opacity-90 backdrop-blur-[4px]
            ${isDesktop ? 'w-desktop' : 'w-full max-w-desktop'}
        `}>
            <div className="inner relative w-full flex items-center justify-between">
                <div onClick={ onClickBackHandle } className="left flex items-center cursor-pointer">
                    <IconArrowAngle width={36} fill='#0A0A0A' />
                </div>
                <h1 className='absolute xy-center text-[24px] font-medium text-font-a'>{ character_nm }</h1>
                <div className='right'>
                    <div
                        className="
                            date font-pretendard text-[12px] text-primary-01 font-medium leading-none
                            flex items-center border-[1px] border-primary-01 rounded-full px-3.5 py-1"
                    >
                        <span>D</span>
                        <span className='-mt-0.5'>+</span>
                        <span>{ dday }</span>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default ChatHeader;