import React from 'react'

const FullScreen = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-viewScreen z-50 bg-achromatic-white/65'>
            <div className={`absolute xy-center animation-rotation duration-700 w-[39px] h-[39px] border-[7px] border-achromatic-04 border-b-primary-blue rounded-full box-border`}></div>
        </div>
    )
}

export default FullScreen;
