import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectChatRoomInfo } from '_redux/chatInfo/selector';
import { chatTimeFormatText } from 'services/chat/_fetch/_types';
import CharacterSpine from 'components/home/CharacterSpine';
import { messageMixpanel } from 'hooks/useWebviewBridge';
import { formatDate } from 'utils';

const HelloMessage = () => {
    const { characterSe } = useParams();
    const { character_nm, subscribe_yn, character_en_nm } = useSelector(selectChatRoomInfo);
    const [ emotionFlag, setEmotionFlag ] = React.useState(true);
    // const timer = React.useRef<NodeJS.Timeout>();
    // const duration = 3000;

    // React.useEffect(() => {
    //     clearTimeout(timer.current);
    //     timer.current = setTimeout(() => {
    //         setEmotionFlag(false);
    //     }, duration)

    //     return () => {
    //         clearTimeout(timer.current);
    //     }
    // }, [])

    
    if (subscribe_yn === 2) {
        return (
            <div className='p-2.5 relative z-[2] text-center'>
                <p className='bg-primary-03 text-white inline-block text-[12px] leading-none px-2 py-1 rounded-full mt-3 mb-2'>{ chatTimeFormatText() }</p>
                <p className='font-pretendard text-[12px] text-gray-02'>🌼{ character_nm }에게 인사를 해주세요!🌼</p>
                {
                    // character_en_nm && emotionFlag &&
                    character_en_nm &&
                    <CharacterSpine
                        jsonUrl={`/spine/emotion_${character_en_nm.toLocaleLowerCase()}_newchat.json`}
                        atlasUrl={`/spine/emotion_${character_en_nm.toLocaleLowerCase()}_newchat.atlas`}
                        animationName='animate'
                        loop={ false }
                        className='fixed x-center w-full max-w-desktop'
                    />
                }
            </div>
        )
    } else {
        return <React.Fragment />
    }
}

export default React.memo(HelloMessage);