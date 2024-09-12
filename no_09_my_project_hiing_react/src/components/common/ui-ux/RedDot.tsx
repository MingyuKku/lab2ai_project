import React from "react";

interface Props {
    size?: number;
    top?: number;
    right?: number;
}

const RedDot = ({ size, top, right }: Props) => {

    const style = React.useMemo(() => ({
        'width': `${ size ?? 5 }px`,
        'height': `${ size ?? 5 }px`,
        'top': `${ top ?? -4 }px`,
        'right': `${ right ?? -8 }px`
    }), [size, top, right])

    return (
        <div className={`absolute bg-system-01 rounded-full`} style={ style }></div>
    )
}

export default RedDot