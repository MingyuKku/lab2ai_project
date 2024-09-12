'use client'

import { HistoryDocumentJsonData } from '@/services/check-history/_types';
import React, { createContext, useContext } from 'react'

const CheckHistoryItemContext = createContext<HistoryDocumentJsonData[]>([]);


interface Props {
    historyItems: HistoryDocumentJsonData[];
    children?: React.ReactNode;
}

const CheckHistoryItemProvider: React.FC<Props> = ({ historyItems, children }) => {

    const [ items ] = React.useState(historyItems);
    
    return (
        <CheckHistoryItemContext.Provider value={ items }>
            { children }
        </CheckHistoryItemContext.Provider>
    )
}

export default CheckHistoryItemProvider;


export const useCheckHistoryItemProvider = () => {
    return useContext(CheckHistoryItemContext);
}