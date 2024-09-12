import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "./types";

const initState: State = {
    activeTabIndex: 0,
    characterSe: null,
    characterNm: null,
    characterNmEn: null,
}

export const homeCharactorSlice = createSlice({
    name: 'homeCharactorSlice',
    initialState: initState,
    reducers: {
        sethomeCharacter(state, action: PayloadAction<State>) {
            state.activeTabIndex = action.payload.activeTabIndex;
            state.characterSe = action.payload.characterSe;
            state.characterNm = action.payload.characterNm;
            state.characterNmEn = action.payload.characterNmEn;
        },
    },
})

export const {
    sethomeCharacter,
} = homeCharactorSlice.actions;