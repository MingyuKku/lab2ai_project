import { messageMixpanel } from 'hooks/useWebviewBridge';
import React from 'react';
import { isDesktop } from 'react-device-detect';
import { Link, useNavigate } from 'react-router-dom';
import { CharacterProfile } from 'services/character';

interface Props {
    profile: CharacterProfile;
}

const Content = ({ profile }: Props) => {
    const navigate = useNavigate();

    const onClickBackImgHandle = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (profile) {
            navigate(`/character/${profile.character_se}/profile/images?type=background_lk`)

            messageMixpanel({
                tracking_type: 'event',
                event_name: 'click_background_profile',
                param: {
                    'persona': profile.character_nm
                }
            })
        }
    }, [profile])

    const onClickLinkHandle = React.useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();

        if (!profile) return;

        messageMixpanel({
            tracking_type: 'event',
            event_name: 'click_main_profile',
            param: {
                'persona': profile.character_nm
            }
        })
    }, [profile])
    
    return (
        <div onClick={ onClickBackImgHandle } className="profile-content relative flex-1">
            <div
                className={`
                    back-bg-layer fixed top-0 z-[1] h-full bg-black bg-opacity-30 cursor-pointer
                    ${isDesktop ? 'w-desktop' : 'w-full max-w-desktop'}
                `}
                // onClick={ onClickBackImgHandle }
            ></div>
            <div className='content absolute bottom-5 z-[1] w-full flex flex-col items-center'>
                <Link
                    to={`/character/${profile.character_se}/profile/images?type=profile_thumbnail_lk`}
                    onClick={ onClickLinkHandle }
                    className="profile-image block w-[110px] h-[110px] overflow-hidden rounded-full"
                >
                    <img
                        src={ process.env.REACT_APP_IMAGE_URL! + profile.porofile_thumbnail_lk }
                        alt="img"
                        width={110}
                        height={110}
                        loading='lazy'
                        className='h-full object-cover'
                    />
                </Link>
                <div className='text font-pretendard text-white text-center mt-2'>
                    <h1 className='text-[24px] font-semibold'>{ profile.character_nm }</h1>
                    <p className='text-[13px] font-medium mt-1'>{ profile.state_ct }</p>
                </div>
            </div>
        </div>
    )
}

export default Content;