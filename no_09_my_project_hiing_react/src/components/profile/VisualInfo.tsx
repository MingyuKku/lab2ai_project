import React from 'react'
import { useSelector } from 'react-redux'
import { selectMember } from '_redux/member/selector';

const VisualInfo = () => {

    const { nick_nm1, nick_nm2 } = useSelector(selectMember);


    return (
        <div className='visual-info relative'>
            <div className="profile-info absolute xy-center">
                <div className="profile-image-wrap flex justify-center items-center w-[94px] h-[94px] border-white border-[2px] rounded-full bg-primary-01">
                    <div className='profile-image w-16 h-[60px]'>
                        <img
                            src="https://d25qtvpmz7kl1a.cloudfront.net/chat/hiing-bi.png"
                            alt="bi"
                            width={64} height={60}
                            loading='lazy'
                        />
                    </div>
                </div>
                <p className='text-center text-[22px] mt-1'>{ nick_nm1 }{ nick_nm2 }</p>
            </div>
            
            <div className="profile-bg-image h-[176px]">
                <img
                    src="https://d25qtvpmz7kl1a.cloudfront.net/chat/profile-bg.png"
                    alt="bg"
                    width={360}
                    height={214}
                    loading='lazy'
                    className='h-full object-cover'
                />
            </div>
        </div>
    )
}

export default VisualInfo
