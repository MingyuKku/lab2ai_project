import React from 'react';
import { Socket } from 'socket.io-client';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAndroid, isDesktop, isIOS } from 'react-device-detect';
import { selectMember } from '_redux/member/selector';
import { selectChatRoomInfo } from '_redux/chatInfo/selector';
import { socket_values, useSocketContext } from 'context/Socket';
import { messageMixpanel, messageWebview } from 'hooks/useWebviewBridge';

const IconMessage = React.lazy(() => import('icon/arrow/Arrow'));

interface Props {
    socket: Socket;
    pushUserMessage: (msg: string) => void;
    submitFlag: boolean;
    elRef: React.MutableRefObject<HTMLDivElement | null>;
}


const MessageInput = ({ socket, pushUserMessage, submitFlag, elRef }: Props) => {
    const { se, nick_nm2 } = useSelector(selectMember);
    const { character_en_nm, character_nm } = useSelector(selectChatRoomInfo);
    const { characterSe } = useParams();
    const [ serchParams ] = useSearchParams();
    const inputName = 'message';
    const MAX_TEXT_LENGTH = 256;

    const [ , startTransition ] = React.useTransition();
    // const [ , startTransitionInput ] = React.useTransition();
    const [ text, setText ] = React.useState('');
    const [ focusFlag, setFocusFlag ] = React.useState(false);
    const deferreText = React.useDeferredValue(text);
    
    const formRef = React.useRef<HTMLFormElement>(null);
    const inputElRef = React.useRef<HTMLInputElement>(null);
    const fakeInputElRef = React.useRef<HTMLInputElement>(null);
    const debounceTimer = React.useRef<NodeJS.Timeout>();
    const scrollBottomStickyTimer = React.useRef<NodeJS.Timeout>();
    // let timerCount = 0;

    const onSubmitMessage = React.useCallback(async (e:React.FocusEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimText = deferreText.trim();

        if (
            submitFlag ||
            !trimText ||
            !characterSe ||
            !character_nm
        ) return;

        if (trimText.length > MAX_TEXT_LENGTH) {
            messageWebview({
                type: 'dialog',
                param: {
                    'title': `메세지 입력은 256글자를 초과할 수 없습니다! 현재 글자수: ${trimText.length}`
                }
            });
            return;
        }

        
        // if (isConnected) {
        if (socket.connected) {
            try {
                socket.emit(socket_values.onEvent.send_message, {
                    member_se: se,
                    character_se: Number(characterSe),
                    character_en_nm: character_en_nm,
                    user_message: text,
                    nick_nm2
                });

                messageMixpanel({
                    tracking_type: 'event',
                    event_name: 'send_chat',
                    param: {
                        'persona': character_nm,
                        'location': serchParams.get('before_location') ?? ''
                    }
                })

                messageMixpanel({
                    tracking_type: 'user_incremental',
                    event_name: 'talk_count',
                    param: {
                        'amount': '1',
                    }
                })

                pushUserMessage(text);
                setText('');

            } catch (err) {
                
            }
        } else {
            alert('소켓 연결 에러!')
        }

    }, [submitFlag, deferreText, characterSe, character_nm])



    React.useEffect(() => {
        if (!window.visualViewport) return;

        const scrollMove = () => {
            const scrollContainer = (isIOS) ? elRef.current : document.body;

            if (scrollContainer) {
                if (scrollBottomStickyTimer.current) clearTimeout(scrollBottomStickyTimer.current);
                scrollBottomStickyTimer.current = setTimeout(() => {
                    scrollContainer.scrollTo({top: 999999, behavior: 'smooth'});
                }, 300)
            }
        }

        const handleVisualViewportScroll = (e: Event) => {
            e.preventDefault();
            window.scrollTo(0,0);
            document.body.scrollTop = 0;
        }

        let prevVisualViewport = window.visualViewport.height;

        const handleVisualViewportResize = (e: Event) => {
            if (!window.visualViewport || !inputElRef.current || !elRef.current) return;

            const { body } = document;

            if (isIOS) {
                window.scrollTo(0,0);
                body.scrollTop = 0;
            }
            

            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(() => {
                const visualViewport = e.target as VisualViewport;
                const { height: viewportHeight } = visualViewport;
                const inputHeight = 66;

                const isKeyboard = (prevVisualViewport > viewportHeight) && inputElRef.current?.classList.contains('on-focus')
                
                if (isKeyboard) {
                    // 키보드 온

                    if (isAndroid) {
                        window.scrollTo(0, 999999);
                        body.scrollTop = 999999;
                    }
                    
                    if (isIOS) {
                        const keyboardGab = prevVisualViewport - viewportHeight;
                        elRef.current!.scrollTop = 999999;
                    }

                    scrollMove();

                } else {
	                // 키보드 오프
                }

            }, 100)
        }


        if (isIOS || isAndroid) {
            window.visualViewport.addEventListener('resize', handleVisualViewportResize);
        }

        if (isIOS) {
            document.body.style.minHeight = `${window.innerHeight}px`;
            window.visualViewport.addEventListener('scroll', handleVisualViewportScroll);
        }

        // document.body.style.border = '4px solid #ff0000';
        // elRef.current!.style.border = '4px solid #0000ff'
        
        return () => {

            if (isIOS || isAndroid) {
                window.visualViewport?.removeEventListener('resize', handleVisualViewportResize);

                clearTimeout(debounceTimer.current);
                clearTimeout(scrollBottomStickyTimer.current);
            }
            if (isIOS) {
                window.visualViewport?.removeEventListener('scroll', handleVisualViewportScroll);
            }
        }
    }, [])

    const onFocusHandler = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        e.target.classList.add('on-focus');

        setFocusFlag(true);
        
    }, [])

    const onBlurHandler = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        e.target.classList.remove('on-focus');
        
        setFocusFlag(false);

    }, [])
    

    const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setText(target.value);
    }

    const onClickSubmitButtonHandle = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        // console.log('클릭!', focusFlag)
        e.preventDefault(); // 기본 폼 제출 방지
        fakeInputElRef.current?.focus();
        inputElRef.current?.focus();

        const formEvent = new Event('submit', { bubbles: true }) as unknown as React.FocusEvent<HTMLFormElement>;
        onSubmitMessage(formEvent);

    }, [onSubmitMessage])


    React.useEffect(() => {
        if (!character_nm) return;
        
        const onvisibilitychange = (e: Event) => {
            const { visibilityState } = document;

            if (visibilityState === 'hidden') {
                inputElRef.current?.blur();

                messageMixpanel({
                    tracking_type: 'event',
                    event_name: 'leave_chatroom',
                    param: {
                        'persona': character_nm,
                    }
                })
            }
        }
        window.addEventListener('visibilitychange', onvisibilitychange);

        return () => window.removeEventListener('visibilitychange', onvisibilitychange);
    }, [character_nm])
    

    return (
        <React.Fragment>
            {/* <ChatHeader ref={ headerRef } /> */}
            {/* { (!isDesktop && focusFlag) &&
                <div
                    onMouseDown={ () => inputElRef.current?.blur() } 
                    onTouchStart={ () => inputElRef.current?.blur() } 
                    className='input-blur-screen fixed top-0 left-0 w-full h-full z-10'
                ></div>
            } */}
            <div className={`
                message-input-wrap fixed bottom-0 z-40 bg-white p-3.5
                ${isDesktop ? 'w-desktop x-center' : 'w-full max-w-desktop'}
            `}>
                <div className="input-box">
                    <form
                        ref={ formRef }
                        onSubmit={ onSubmitMessage }
                        autoComplete='off'
                        className='relative flex items-center h-[38px] p-[3px] pl-5 bg-gray-06 border-gray-05 border-[1px] rounded-full'
                    >
                        <input
                            ref={ inputElRef }
                            type="text"
                            autoComplete='off'
                            autoCorrect='off'
                            autoSave='off'
                            name={ inputName }
                            value={ text }
                            onInput={ onInputHandler }
                            onFocus={ onFocusHandler }
                            onBlur={ onBlurHandler }
                            className='block w-full h-full none-st'
                        />
                        <input
                            ref={ fakeInputElRef }
                            type="text"
                            className='fake-input absolute w-full opacity-0 top-full left-0'
                        />
                        <button
                            // type='submit'
                            type='button'
                            onClick={ deferreText.trim() ? onClickSubmitButtonHandle : undefined }
                            className={`
                                icon-wrap shrink-0 w-8 h-8 flex items-center justify-center rounded-full
                                ${ deferreText.trim() ? 'bg-primary-01' : 'bg-gray-04' }
                            `}
                        ><IconMessage /></button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MessageInput;