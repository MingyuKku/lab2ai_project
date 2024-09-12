import { PiniaPopup } from "../keys";

export const piniaPopup = defineStore(PiniaPopup, () => {

    const popupFlag = ref(false);

    const appDownload = reactive<{
        flag: boolean;
        title: string | null;
    }>({
        flag: false,
        title: null,
    });

    const togglePopupFlag = (value: boolean) => {
        popupFlag.value = value;
    }

    const toggleAppDownloadPopupFlag = (value: boolean, title?: string) => {
        popupFlag.value = value;
        appDownload.flag = value;
        if (value === false) appDownload.title = null;
        if (title) appDownload.title = title;
    }

    return {
        popupFlag,
        togglePopupFlag,
        appDownload,
        toggleAppDownloadPopupFlag,
    }
})