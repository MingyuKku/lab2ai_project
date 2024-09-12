import React from 'react'
import CharacterSpine from 'components/home/CharacterSpine';

interface Props {
    character_en_nm: string;
    effectText: string | null;
}


const SpineEmotions = ({ character_en_nm, effectText }: Props) => {

    return (
        <div className={`fixed w-full h-viewScreen left-0 top-0 z-[2] text-center pt-basic-header`}>
            <CharacterSpine
                jsonUrl={`/spine/emotion_${character_en_nm.toLocaleLowerCase()}_${effectText}.json`}
                atlasUrl={`/spine/emotion_${character_en_nm.toLocaleLowerCase()}_${effectText}.atlas`}
                animationName='animate'
                loop={ false }
                className='absolute x-center translate-y-[53px] w-full max-w-desktop'
            />
        </div>
    )
}

export default SpineEmotions;