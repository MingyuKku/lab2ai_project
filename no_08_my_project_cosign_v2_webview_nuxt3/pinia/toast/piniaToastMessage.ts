import { useCommon } from "~/composables/_app/useCommon";
import { PiniaToastMessage } from "../keys";
import type { AlertValues, SetAlertValueParams } from "../popup/_types";

export const piniaToastMessage = defineStore(PiniaToastMessage, () => {
    const toastValues = reactive<Pick<AlertValues, 'flag' | 'description'>>({
        flag: false,
        description: ''
    });


    const messageViewTimer = ref<NodeJS.Timeout | null>(null);
    const { delay } = useCommon();

    const setToastValue = async (params: Pick<SetAlertValueParams, 'description'> | null) => {
        toastValues.description = params ? params.description : '';

        if (params) {
            toastValues.flag = true;
            await delay(messageViewTimer, 3000);
            setToastValue(null);
        }
        else toastValues.flag = false;
    }


    onUnmounted(() => {
        if (messageViewTimer.value) clearTimeout(messageViewTimer.value);
    })

    return {
        toastValues,
        setToastValue,
    }
})