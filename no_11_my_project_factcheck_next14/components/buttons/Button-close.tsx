import React from 'react';
import IconAngle from '@/components/icon/Angle';

interface Props {
    onClickButton?: () => void;
    className?: string;
}

const ButtonClose: React.FC<Props> = ({ onClickButton, className }) => {
    return (
        <div
            onClick={ onClickButton }
            className={`
                flex items-center justify-center w-[38px] h-[38px] cursor-pointer rounded-full bg-achromatic-white border-[1.5px] border-achromatic-03
                ${ className }
            `}
        >
            <IconAngle />
        </div>
    )
}

export default ButtonClose;
