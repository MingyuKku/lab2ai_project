import React from 'react'
import { useSelector } from 'react-redux';
import { selectChatRoomInfo } from '_redux/chatInfo/selector';
import { joyfull } from 'components/particles/options/images';
import { sadness } from 'components/particles/options/shape';

const ChatBackgroundImg = React.lazy(() => import('components/common/ui-ux/ChatBackgroundImg'));
// const ImageParticle = React.lazy(() => import('components/particles/ImageParticle'));
// const ShapeParticle = React.lazy(() => import('components/particles/ShapeParticle'));
const LoadFullParticle = React.lazy(() => import('components/particles/LoadFullParticle'));
const SpineEmotions = React.lazy(() => import('./SpineEmotions'));

interface Props {
    effectFlag: string | null;
}

const EffectMotion = ({
    effectFlag
}: Props) => {

    const { character_en_nm } = useSelector(selectChatRoomInfo);

    const getBgUrl = React.useMemo(() => {
        // if (effectFlag === 'joyful') {
        //     return 'https://d25qtvpmz7kl1a.cloudfront.net/chat/joyfull-bg.png';
        // } else 
        if (effectFlag === 'sadness') {
            return 'https://d25qtvpmz7kl1a.cloudfront.net/chat/sadness-bg.png'
        } else {
            return 'https://d25qtvpmz7kl1a.cloudfront.net/chat/chat-room-bg.png';
        }
    }, [effectFlag])

    const getOption = React.useMemo(() => {
        // if (effectFlag === 'joyful') {
        //     return joyfull;
        // } else 
        if (effectFlag === 'sadness') {
            return sadness;
        } else {
            return {};
        }
    }, [effectFlag])


    const getSpineText = React.useMemo(() => {
        if (effectFlag === 'joyful') return effectFlag;
        if (effectFlag === 'encourage') return 'fighting';
        else return null;

    }, [effectFlag])
    
    return (
        <React.Fragment>
            <React.Suspense>
                <ChatBackgroundImg
                    bgImageUrl={ getBgUrl }
                />
                {
                    (character_en_nm && getSpineText) &&
                    <SpineEmotions character_en_nm={ character_en_nm } effectText={ getSpineText } />
                }
            </React.Suspense>
            { effectFlag &&
                <React.Suspense>
                    {
                        effectFlag &&
                        <LoadFullParticle
                            opt={ getOption } 
                            className='relative z-[2]' 
                        />
                    }
                </React.Suspense> 
            }
        </React.Fragment>
    )
}

export default EffectMotion