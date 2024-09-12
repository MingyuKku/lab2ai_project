import React from 'react';
import { isDesktop } from 'react-device-detect';


const ImageSwiper = ({ children }: React.PropsWithChildren) => {
    return (
        <div className={`
            fixed top-0 h-full bg-black
            ${isDesktop ? 'w-desktop' : 'w-full max-w-desktop'}
        `}>
            { children }
        </div>
    )
}

export default ImageSwiper;