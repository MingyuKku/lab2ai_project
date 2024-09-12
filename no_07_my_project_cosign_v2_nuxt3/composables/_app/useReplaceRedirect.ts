export function useReplaceRedirect() {
    
    const changeQueryParams = <T>(queryParams: Partial<T>) => {
        const { query } = useRoute();
        navigateTo({
            query: {
                ...query,
                ...queryParams
            },
            replace: true,
        })
    }

    return {
        changeQueryParams,
    }
}