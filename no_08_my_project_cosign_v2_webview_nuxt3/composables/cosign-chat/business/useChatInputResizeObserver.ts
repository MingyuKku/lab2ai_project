export const useChatInputResizeObserver = (updateInputAreaHeight: (value: number) => void) => {

    const chatInputRef = ref<HTMLDivElement>();
    const resizeObserver = ref<ResizeObserver | null>(null);

    onMounted(() => {
        resizeObserver.value = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { borderBoxSize } = entry;
                const { blockSize } = borderBoxSize[0];
                updateInputAreaHeight(blockSize)
            }
        })

        if (!chatInputRef.value) return;
        resizeObserver.value.observe(chatInputRef.value)
    })

    onUnmounted(() => {
        resizeObserver.value?.disconnect();
    })

    return {
        chatInputRef,
    }
}