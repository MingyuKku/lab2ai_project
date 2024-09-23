'use client'

import { DocsList, HistoryDocumentJsonData } from '@/services/check-history/_types';
import React, { createContext, useContext } from 'react'

const CheckHistoryItemContext = createContext<DocsList[]>([]);


interface Props {
    historyItems: DocsList[];
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