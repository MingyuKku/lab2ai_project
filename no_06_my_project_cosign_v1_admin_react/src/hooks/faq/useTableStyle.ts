import React from "react";

export const useTableStyle = () => {
    const DEFAULT_COLUMN_BASIS_PX = 124;

    const columnStyle = React.useMemo<React.CSSProperties>(() => {
        return {
            'flexBasis': DEFAULT_COLUMN_BASIS_PX,
            'minWidth': 80
        }
    }, [])

    return {
        columnStyle,
    }
}