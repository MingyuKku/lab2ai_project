import React from 'react'
import { CharacterStateHistoryClass } from 'services/character';

interface Props {
    item: CharacterStateHistoryClass;
    profile: CharacterStateHistoryClass | null;
}


const HistoryItem = ({ item, profile }: Props) => {

    const getStateText = React.useMemo(() => {
        if (item.type_cd === 1) {
            return `${item.character_nm}의 프로필사진`;
        } else if (item.type_cd === 2) {
            return `${item.character_nm}의 배경사진`;
        } else if (item.type_cd === 3) {
            return `${item.character_nm}의 상태메세지`;
        } else {
            return ''
        }
    }, [item])

    const getImage = React.useMemo(() => {
        if (item.type_cd === 1) {
            return item.profile_thumbnail_lk;
        } else if (item.type_cd === 2) {
            return item.background_lk;
        } else if (item.type_cd === 3) {
            return item.background_lk;
        } else {
            return null;
        }
    }, [item])


    return (
        <li className='relative bg-white mb-2 last:mb-0'>
            <div className='shadow absolute bottom-0 left-0 w-full h-px bg-[#EAEAEA]'></div>
            <div className="content">
                <div className="top flex items-center px-3.5 py-3">
                    <div className="thumb-img w-9 h-9 rounded-full overflow-hidden mr-2.5">
                        {
                            profile && profile.profile_thumbnail_lk &&
                            <img
                                src={ profile.profile_thumbnail_lk }
                                alt="thumb"
                                width={36}
                                height={36}
                                loading='lazy'
                                className='h-full object-cover'
                            />
                        }
                    </div>
                    <div className='font-pretendard'>
                        <h2 className='text-[14px]'>{ getStateText }</h2>
                        <p className='text-[11px] text-gray-03'>{ item.reg_dt }</p>
                    </div>
                </div>
                {
                    item.type_cd === 3 ?
                    <div className="relative image pb-1.5 h-[208px]">
                        {
                            getImage &&
                            <img
                                src={ getImage ?? '' }
                                alt="bg"
                                width={360}
                                height={208}
                                loading='lazy'
                                className='h-full object-cover'
                            />
                        }
                        <div className='blur-bg bg-gray-01 bg-opacity-50 absolute w-full h-full top-0 left-0 backdrop-blur-lg'></div>
                        <div className='absolute xy-center w-full text-center px-[30px]'>
                            <p className='font-pretendard text-[18px] font-medium text-white'>{ item.state_ct }</p>
                        </div>
                    </div>
                    : <div className="image pb-1.5">
                    {
                        getImage &&
                        <img
                            src={ getImage ?? '' }
                            alt="bg"
                            width={360}
                            height={250}
                            loading='lazy'
                        />
                    }
                </div>
            }
            </div>
        </li>
    )
}

export default HistoryItem;