import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State, PersonalMessagesPayloadAction } from "./types";

const initState: State = {
    messages: {}
}

export const personalMessagesSlice = createSlice({
    name: 'personalMessagesSlice',
    initialState: initState,
    reducers: {
        setPersonalMessage(state, action: PayloadAction<PersonalMessagesPayloadAction>) {
            state.messages[action.payload.key] = action.payload.message;
        },
    },
})

export const {
    setPersonalMessage,
} = personalMessagesSlice.actions;