'use client'

import { HistoryDocumentJsonData } from '@/services/check-history/_types';
import React, { createContext, useContext } from 'react'

const CheckHistoryItemPopupContext = createContext<{
    item: HistoryDocumentJsonData | null;
    scrollElem: React.RefObject<HTMLDivElement> | null;
    scrollElemHeight: number;
    updatePopupScrollElemHeight?: React.Dispatch<React.SetStateAction<number>>;
}>({
    item: null,
    scrollElem: null,
    scrollElemHeight: 0,
});


interface Props {
    detailInfoitem: HistoryDocumentJsonData;
    scrollElem: React.RefObject<HTMLDivElement>;
    scrollElemHeight: number;
    children?: React.ReactNode;
}

const CheckHistoryItemPopupProvider: React.FC<Props> = ({ detailInfoitem, scrollElem, scrollElemHeight, children }) => {

    const [ item ] = React.useState(detailInfoitem);
    const [ popupScrollElem ] = React.useState(scrollElem);
    const [ popupScrollElemHeight, updatePopupScrollElemHeight ] = React.useState(scrollElemHeight);


    React.useEffect(() => {
        if (!scrollElemHeight) return;

        updatePopupScrollElemHeight(scrollElemHeight)
    }, [scrollElemHeight])

    
    return (
        <CheckHistoryItemPopupContext.Provider value={{
            item,
            scrollElem: popupScrollElem,
            scrollElemHeight: popupScrollElemHeight,
            updatePopupScrollElemHeight: updatePopupScrollElemHeight
        }}>
            { children }
        </CheckHistoryItemPopupContext.Provider>
    )
}

export default CheckHistoryItemPopupProvider;


export const useCheckHistoryItemPopupProvider = () => {
    return useContext(CheckHistoryItemPopupContext);
}