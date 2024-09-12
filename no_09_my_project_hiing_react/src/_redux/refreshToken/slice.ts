import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "./types";

const initState: State = {
    token: null,
}

export const refreshTokenSlice = createSlice({
    name: 'refreshTokenSlice',
    initialState: initState,
    reducers: {
        setRefreshToken(state, action: PayloadAction<State>) {
            state.token = action.payload.token;
        },
    },
})

export const {
    setRefreshToken,
} = refreshTokenSlice.actions;