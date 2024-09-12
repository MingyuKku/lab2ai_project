import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./modal/slice";
import { popupAlertSlice } from "./popup/alert/slice";

const store = configureStore({
    reducer: {
        modalReducer: modalSlice.reducer,
        alertReducer: popupAlertSlice.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false,
    // })
})


export const { getState, dispatch } = store;

export default store;