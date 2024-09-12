import React from 'react'

export type FallbackType = NonNullable<React.ReactNode> | null;

interface FallbackContextType  {
    updateFallback: (fallback: FallbackType) => void;
}

const FallbackContext = React.createContext<FallbackContextType>({
    updateFallback: () => {},
});


const FallbackProvider = ({ children }: React.PropsWithChildren) => {

    const [fallback, setFallback] = React.useState<FallbackType>(null);
    
    const updateFallback = React.useCallback((fallback: FallbackType) => {
        setFallback(() => fallback);
    }, []);

    const renderChildren = React.useMemo(() => {
        return children;
    }, [children]);

    return (
        <FallbackContext.Provider value={{ updateFallback }} >
            <React.Suspense fallback={fallback}>{ renderChildren }</React.Suspense>
        </FallbackContext.Provider>
    )
}

export default FallbackProvider;