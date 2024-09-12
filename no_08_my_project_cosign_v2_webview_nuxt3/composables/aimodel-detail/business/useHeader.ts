import type { HeaderDataType } from "./_types";

export function useHeader() {
    const headerData = ref<HeaderDataType>({
        modelName: '',
        tradeType: null
    })


    const updateHeaderData = (value: HeaderDataType) => {
        headerData.value = value;
    }    


    return {
        headerData,
        updateHeaderData
    }
}