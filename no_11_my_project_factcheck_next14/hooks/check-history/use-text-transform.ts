import { Facts, FactValuesType } from "@/constants/_types"
import React from "react";


type GetDocsStatusTextReturnType<T extends FactValuesType> = typeof Facts[T];

    
export const useTextTransform = () => {
    
    const getDocsStatusText = React.useCallback(<T extends FactValuesType>(docsStatus: T | null): GetDocsStatusTextReturnType<T>['label'] | null => {
        if (!docsStatus) return null;
        return Facts[docsStatus].label;
    }, [])

    const getDocsStatusColorStyle = React.useCallback((docsStatus: FactValuesType | null): React.CSSProperties => {
        if (!docsStatus) return {
            'backgroundColor': undefined,
        }
        return {
            'color': Facts[docsStatus].color
        }
    }, [])

    const getDocsStatusBgStyle = React.useCallback((docsStatus: FactValuesType | null): React.CSSProperties => {
        if (!docsStatus) return {
            'backgroundColor': undefined,
        }
        return {
            'backgroundColor': Facts[docsStatus].color
        }
    }, [])

    const getDocsStatusBorderStyle = React.useCallback((docsStatus: FactValuesType | null): React.CSSProperties => {
        if (!docsStatus) return {
            'border': undefined,
        }
        return {
            'border': `1px solid ${Facts[docsStatus].color}`
        }
    }, [])

    const isAnalysisComplete = React.useCallback((docsStatus: FactValuesType) => {
        return Facts[docsStatus].analysisComplete;
    }, [])

    return {
        getDocsStatusText,
        getDocsStatusColorStyle,
        getDocsStatusBgStyle,
        getDocsStatusBorderStyle,
        isAnalysisComplete,
    }
}