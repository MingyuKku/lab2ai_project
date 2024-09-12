import React from 'react';
import { Link } from 'react-router-dom';
import { messageMixpanel, messageWebview } from 'hooks/useWebviewBridge';
import { CharactersClass } from 'services/character';
import EffectImages from 'components/home/EffectImages';


interface Props {
    item: CharactersClass;
}

const ContentView = ({ item }: Props) => {

    const onClickRouterToCharacterPage = React.useCallback((e: React.MouseEvent) => {
        // if (!window.localStorage.getItem('web-test')) e.preventDefault();
        if (process.env.NODE_ENV !== 'development') e.preventDefault();
        messageWebview({
            type: 'push',
            path: '/chat_room',
            param: {
                'web_path': `/chat/${item.character_se}`
            }
        })
    }, [])


    const onClickChatRoom = React.useCallback((character_nm: string) => {
        return () => {
            messageMixpanel({
                tracking_type: 'event',
                event_name: 'click_chat_room',
                param: {
                    'persona': character_nm,
                    'location': '홈화면'
                }
            });
        }
    }, [])

    return (
        // <div className='content-view relative text-center'>
        <div className='content-view text-center h-full'>
            {/* <EffectImages /> */}
            {/* <div className='relative z-[1] flex flex-col items-center'> */}
            <div className='w-full flex flex-col items-center'>
                <h1 className='text-[32px] font-semibold leading-none mb-2.5'>{ item.character_nm }</h1>
                {
                    item.character_ct_array.map((text, idx) => (
                        <p key={idx} className='text-[15px] text-[#53392E]'>{ text }</p>
                    ))
                }
                <Link
                    to={`/chat/${item.character_se}?before_location=홈화면`}
                    onClick={ onClickChatRoom(item.character_nm) }
                    // onClick={ onClickRouterToCharacterPage }
                    className='block w-full px-3.5 py-5'
                >
                    <button className='d-button-st rounded-full w-full font-pretendard'>{ item.character_nm }와 대화하기</button>
                </Link>
            </div>
        </div>
    )
}

export default ContentView;