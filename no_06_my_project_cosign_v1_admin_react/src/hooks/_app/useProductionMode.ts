import React from "react";
import { ProductionType } from "constants/_types";
import { LOCAL_STORAGE_KEY } from "constants/local-storage";

export const useProductionMode = () => {
    const getMode = React.useMemo<ProductionType>(() => {
        const mode = localStorage.getItem(LOCAL_STORAGE_KEY) as ProductionType | null;
        return mode ?? 'dev';
    }, [])

    const setMode = (value: string) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, value);
    }


    return {
        getMode,
        setMode,
    }
}