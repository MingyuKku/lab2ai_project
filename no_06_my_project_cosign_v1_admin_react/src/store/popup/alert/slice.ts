import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertState } from "./_types";
import { ALERT_SLICE } from "store/_names";


const initState: AlertState = {
    flag: false,
}


export const popupAlertSlice = createSlice({
    name: ALERT_SLICE,
    initialState: initState,
    reducers: {
        setAlert(state, action: PayloadAction<Omit<AlertState, 'flag'> | null>) {

            const { payload } = action;
            if (payload === null) {
                state.flag = false;
                delete state.title;
                delete state.description;
                delete state.buttons;
            } else {
                state.flag = true;
                const { title, description, buttons } = payload;
                if (title) state.title = title;
                if (description) state.description = description;
                if (buttons) state.buttons = buttons;
            }
        }
    },
})


export const {
    setAlert,
} = popupAlertSlice.actions;