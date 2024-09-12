import React from 'react'

const Backgound = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-viewScreen'>
            <div className="opacity-bg absolute top-0 left-0 w-full h-full bg-bg-white/65"></div>
            <div className="bg-image-wrap w-full h-full">
                <img
                    src="https://kr.object.ncloudstorage.com/cosign/project-images/cosign-manager/managerLogin_bg.png"
                    alt="bg"
                    width={ 1080 }
                    height={ 608 }
                    loading='lazy'
                    className='h-full object-cover'
                />
            </div>
        </div>
    )
}

export default Backgound
