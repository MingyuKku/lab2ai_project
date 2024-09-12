import React from 'react';
import { isDesktop } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';

const IconArrowAngle = React.lazy(() => import('icon/arrow/Angle'));

interface Props {
    rightIcon?: JSX.Element;
}

const SwiperModalHeader = ({ rightIcon }: Props) => {
    const navigate = useNavigate();

    return (
        <div className={`
            swipermodal-header-wrap fixed top-0 z-40 flex items-center justify-between h-basic-header px-[22px]
            ${isDesktop ? 'w-desktop' : 'w-full max-w-desktop'}
        `}>
            <div className="inner relative w-full flex items-center justify-between">
                <div onClick={ () => navigate(-1) } className="left flex items-center cursor-pointer">
                    <IconArrowAngle width={36} fill='#fff' />
                </div>
                {/* <h1 className='absolute xy-center text-[24px] font-medium text-font-a'>{ '하하하' }</h1> */}
                <div className='right'>
                    { rightIcon }
                </div>
            </div>
        </div>
    )
}

export default SwiperModalHeader;