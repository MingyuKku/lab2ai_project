import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MODAL_SLICE } from "store/_names"
import { ModalState } from "./_types";

const initState: ModalState = {
    modalFlag: false,
}


export const modalSlice = createSlice({
    name: MODAL_SLICE,
    initialState: initState,
    reducers: {
        toggleModal(state, action: PayloadAction<boolean>) {
            const { payload } = action;
            state.modalFlag = payload;
        }
    }
})


export const {
    toggleModal,
} = modalSlice.actions;