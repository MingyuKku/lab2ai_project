import React from 'react'
import { useSelector } from 'react-redux';
import { selectMember } from '_redux/member/selector';
import { CharactersClass, getCharacterTitleMessage } from 'services/character';

const IconMsgTail = React.lazy(() => import('icon/object/MsgTail'));

interface Props {
    item: CharactersClass;
    characterTitle: string | null;
}

const PersonalMessage = ({ item, characterTitle }: Props) => {
    // const { socket, isConnected } = useSocketContext();
    const { se } = useSelector(selectMember);


    if (characterTitle !== null) {
        return (
            <div className='character-tt-bubble absolute bottom-full x-center flex items-center justify-center w-full'>
                <div className="tt relative z-[1] bg-primary-02 p-2.5 max-w-[280px] rounded-[20px]">
                    <div className='line-clamp-3'>
                        <p className='text-center break-words tracking-normal leading-[1.3] text-white'>{ characterTitle }</p>
                    </div>
                    <div className="message-tail absolute top-full -translate-y-1/3 x-center">
                        <React.Suspense><IconMsgTail fill='#DC906C' /></React.Suspense>
                    </div>
                </div>
            </div>
        )
    } else {
        return <React.Fragment />
    }
}

export default PersonalMessage;