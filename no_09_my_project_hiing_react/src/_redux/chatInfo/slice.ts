import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State, ChatInfoPayloadAction } from "./types";
import { ChatRoomDetail } from "services/chat/_fetch/_types";

const initState: State = {
    info: {
        character_en_nm: '',
        character_nm: '',
        dday: 0,
        porofile_thumbnail_lk: '',
        subscribe_yn: 1,
        // nick_nm2: '',
    }
}

export const chatInfoSlice = createSlice({
    name: 'memberSlice',
    initialState: initState,
    reducers: {
        setChatInfo(state, action: PayloadAction<Partial<ChatRoomDetail>>) {
            if (action.payload.character_en_nm) state.info.character_en_nm = action.payload.character_en_nm;
            if (action.payload.character_nm) state.info.character_nm = action.payload.character_nm;
            if (action.payload.dday) state.info.dday = action.payload.dday;
            if (action.payload.porofile_thumbnail_lk) {
                const encodedFilename = action.payload.porofile_thumbnail_lk.replace(/ /g, '%20').replace(/@/g, '%40');
                state.info.porofile_thumbnail_lk = process.env.REACT_APP_IMAGE_URL + encodedFilename;
            }
            if (action.payload.subscribe_yn) state.info.subscribe_yn = action.payload.subscribe_yn;
        },
        initChatInfo(state) {
            state.info.character_en_nm = '';
            state.info.character_nm = '';
            state.info.dday = 0;
            state.info.porofile_thumbnail_lk = '';
        }
    },
})

export const {
    setChatInfo,
    initChatInfo,
} = chatInfoSlice.actions;