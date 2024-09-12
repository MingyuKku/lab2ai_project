import React from "react"
import { formatDate } from "utils"

export const useCommonGetText = () => {
    
    const itemNo = (totalElements: number, number: number, size: number, index: number) => {
        const no = (totalElements - number * size) - index;
        return no;
    }
    
    const createAtTextFull = React.useCallback((createdAt: string) => {
        return formatDate(Date.parseUtcText(createdAt), 'yyyy-MM-dd HH:mm');
    }, [])

    const createAtTextShort = React.useCallback((createdAt: string) => {
        return formatDate(Date.parseUtcText(createdAt), 'yyyy-MM-dd');
    }, [])
    

    return {
        itemNo,
        createAtTextFull,
        createAtTextShort,
    }
}