'use client'

import { DocsList, HistoryDocumentJsonData } from '@/services/check-history/_types';
import React, { createContext, useContext } from 'react'

const CheckHistoryItemPopupContext = createContext<{
    item: DocsList | null;
    scrollElem?: React.RefObject<HTMLDivElement> | null;
    scrollElemHeight?: number;
    updatePopupScrollElemHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
}>({
    item: null,
    // scrollElem: null,
    // scrollElemHeight: 0,
});


interface Props {
    detailInfoitem: DocsList;
    scrollElem?: React.RefObject<HTMLDivElement>;
    scrollElemHeight?: number;
    children?: React.ReactNode;
}

const CheckHistoryItemPopupProvider: React.FC<Props> = ({ detailInfoitem, scrollElem, scrollElemHeight, children }) => {

    const [ item ] = React.useState(detailInfoitem);
    const [ popupScrollElem ] = React.useState(scrollElem);
    const [ popupScrollElemHeight, updatePopupScrollElemHeight ] = React.useState(scrollElemHeight);


    React.useEffect(() => {
        if (!scrollElemHeight) return;

        updatePopupScrollElemHeight(scrollElemHeight);
    }, [scrollElemHeight])


    const returnProviderValue = React.useCallback(() => {
        if (!scrollElem && !scrollElemHeight) {
            return {
                item,
                scrollElem: popupScrollElem,
                scrollElemHeight: popupScrollElemHeight,
                updatePopupScrollElemHeight: updatePopupScrollElemHeight
            }
        }
        if (!scrollElem) {
            return {
                item,
                scrollElem: popupScrollElem,
            }
        }
        if (!scrollElemHeight) {
            return {
                item,
                scrollElemHeight: popupScrollElemHeight,
                updatePopupScrollElemHeight: updatePopupScrollElemHeight
            }
        }
        return {
            item,
        }
    }, [])

    
    return (
        <CheckHistoryItemPopupContext.Provider value={returnProviderValue()}>
            { children }
        </CheckHistoryItemPopupContext.Provider>
    )
}

export default CheckHistoryItemPopupProvider;


export const useCheckHistoryItemPopupProvider = () => {
    return useContext(CheckHistoryItemPopupContext);
}