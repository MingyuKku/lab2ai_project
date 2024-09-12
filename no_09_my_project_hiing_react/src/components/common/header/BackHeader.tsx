import React from 'react';
import { isDesktop } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { messageWebview } from 'hooks/useWebviewBridge';

const IconArrowAngle = React.lazy(() => import('icon/arrow/Angle'));

interface Props {
    isWebview?: boolean;
    className?: string;
    iconColor?: string;
    rightIcon?: JSX.Element;
    title?: string | null;
}

const BackHeader = ({
    isWebview,
    className,
    iconColor,
    rightIcon,
    title
}: Props) => {
    const navigate = useNavigate();

    const onClickBackHandle = React.useCallback(() => {
        navigate(-1);
        // if (isWebview) {
        //     messageWebview({
        //         type: 'pop',
        //     })
        // }

    }, [])
    

    return (
        <React.Fragment>
            <div
                className={`
                    ${className ?? ''}
                    back-header-wrap fixed top-0 z-40 h-basic-header px-[22px] flex items-center
                    ${rightIcon ? 'justify-between' : ''}
                    ${isDesktop ? 'w-desktop' : 'w-full max-w-desktop'}
                `}
            >
                <div onClick={ onClickBackHandle } className="cursor-pointer">
                    <IconArrowAngle width={36} fill={ iconColor ?? '#000' } />
                </div>
                {
                    title &&
                    <div className='absolute xy-center text-[24px] font-medium'>
                        <h1>{ title }</h1>
                    </div>
                }
                {
                    rightIcon &&
                    <div className='cursor-pointer'>
                        { rightIcon }
                    </div>
                }
            </div>
        </React.Fragment>
    )
}

export default BackHeader;