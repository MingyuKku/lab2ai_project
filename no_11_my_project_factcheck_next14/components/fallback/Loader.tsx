import React from 'react'

interface Props {
    className?: string;
}
const Loader: React.FC<Props> = ({ className }) => {

    return (
        <div className={`animation-rotation duration-700 w-[39px] h-[39px] border-[7px] border-achromatic-04 border-b-primary-blue rounded-full box-border ${ className }`}></div>
    )
}

export default Loader
