export function useSignlistUpdateHeight(refresh: () => Promise<void>) {

    const signlistRef = ref<HTMLDivElement | null>(null);
    const signlistRefHeight = ref<number>(0);


    const refreshSignItems = async () => {
        await refresh();
        updateSignlistRefHeight();
    }

    const updateSignlistRefHeight = () => {
        if (!signlistRef.value) return;

        signlistRefHeight.value = signlistRef.value.offsetHeight;
    }

    onMounted(() => {
        updateSignlistRefHeight();
    })

    return {
        signlistRef,
        signlistRefHeight,
        refreshSignItems,
        updateSignlistRefHeight,
    }
}