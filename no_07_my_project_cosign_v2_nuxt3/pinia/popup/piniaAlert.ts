import { PiniaAlert } from "../keys";
import type { AlertDescription, AlertTitle, AlertValues, Alertbuttons, SetAlertValueParams } from "./_types";

export const piniaAlert = defineStore(PiniaAlert, () => {
    const alertValues = reactive<AlertValues>({
        flag: false,
        title: null,
        description: null,
        buttons: null,
    })

    const setAlertValue = ({
        title,
        description,
        buttons
    }: SetAlertValueParams) => {
        alertValues.flag = true;

        if (title) alertValues.title = title;
        if (description) alertValues.description = description;
        if (buttons) alertValues.buttons = buttons;
    }


    const hiddenAlert = () => {
        alertValues.flag = false;
        alertValues.title = null;
        alertValues.description = null;
        alertValues.buttons = null;
        // delete alertValues.title;
        // delete alertValues.description;
        // delete alertValues.buttons;
    }


    return {
        alertValues,
        setAlertValue,
        hiddenAlert,
    }
})