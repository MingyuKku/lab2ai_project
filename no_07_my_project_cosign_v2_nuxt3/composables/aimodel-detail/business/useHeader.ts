import type { HeaderDataType } from "./_types";

export function useHeader() {
    const headerData = reactive<HeaderDataType>({
        modelName: '',
        tradeType: null
    })


    const updateHeaderData = (value: HeaderDataType) => {
        headerData.modelName = value.modelName
        headerData.tradeType = value.tradeType
    }    


    return {
        headerData,
        updateHeaderData
    }
}