import { CharacterProfile } from 'services/character';

interface Props {
    profile: CharacterProfile;
}

const Bottom = ({ profile }: Props) => {
    return (
        <div className="bottom relative z-[1] flex items-center flex-col py-5">
            <span className='line absolute top-0 w-full h-[0.5px] bg-white'></span>
            <div className="heart-image w-[30px]">
                <img
                    src="https://d25qtvpmz7kl1a.cloudfront.net/chat/i-heart-2.png"
                    alt="heart"
                    width={30}
                    height={26}
                    loading='lazy'
                />
            </div>
            <p className='font-pretendard mt-2 text-[13px] font-medium text-white'>친구 된지 <span>D+{ profile?.dday }</span></p>
        </div>
    )
}

export default Bottom;