export const useInputAreaHeightUpdate = (initHeight: number) => {
    
    const inputAreaHeight = ref(initHeight);

    const updateInputAreaHeight = (value: number) => {
        inputAreaHeight.value = value;
        
    }
    const computedInputAreaHeight = computed(() => ({ 'padding-bottom': `${inputAreaHeight.value}px` }))


    return {
        updateInputAreaHeight,
        computedInputAreaHeight,
    }
}