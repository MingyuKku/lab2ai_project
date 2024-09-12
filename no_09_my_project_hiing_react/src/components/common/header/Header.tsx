import React from 'react'
import { isDesktop } from 'react-device-detect';
import { usePageName } from 'hooks/usePageName';

const Header = () => {

    return (
        <React.Fragment>
            <div className={`
                header-wrap fixed top-0 z-40 flex items-center justify-between h-basic-header px-5
                ${isDesktop ? 'w-desktop' : 'w-full max-w-desktop'}
            `}>
                <h1 className='relative z-[1] font-pretendard text-[24px] font-medium'>{ usePageName() }</h1>
                {/* <div className="title-bg-image absolute top-0 left-0 w-full h-full">
                    <img
                        src="https://d25qtvpmz7kl1a.cloudfront.net/chat/chat-room-list-title-bg.png"
                        alt="bg"
                        className='h-full object-cover'
                        width={360}
                        height={90}
                        loading='lazy'
                    />
                </div> */}
            </div>
        </React.Fragment>
    )
}

export default Header