import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchChatFeedback } from "./thunks";
import { ChatFeedback, AlertPopup, State } from "./types";
import { iosMobileBodyScrollBlock } from "utils";

const initState: State = {
    alertPopup: {
        basicModalFlag: false,
    },
    chatFeedback: {
        modalFlag: false,
    },
}

export const modalSlice = createSlice({
    name: 'modalSlice',
    initialState: initState,
    reducers: {
        setBasicPopup(state, action: PayloadAction<AlertPopup>) {
            state.alertPopup.basicModalFlag = action.payload.basicModalFlag;
            if (action.payload.basicModalFlag) {
                if (action.payload.popupTitle) state.alertPopup.popupTitle = action.payload.popupTitle;
                if (action.payload.popupDescription) state.alertPopup.popupDescription = action.payload.popupDescription;
                if (action.payload.popupButtons) state.alertPopup.popupButtons = action.payload.popupButtons;
            } else {
                delete state.alertPopup.popupTitle;
                delete state.alertPopup.popupDescription;
                delete state.alertPopup.popupButtons;
            }
        },
        setChatFeedbackModal(state, action: PayloadAction<ChatFeedback>) {
            state.chatFeedback.modalFlag = action.payload.modalFlag;
            if (action.payload.modalFlag) {
                iosMobileBodyScrollBlock(true);
            } else {
                iosMobileBodyScrollBlock(false);
            }

            if (action.payload.chatId) {
                state.chatFeedback.chatId = action.payload.chatId;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChatFeedback.pending, (state, action) => {

        });
        builder.addCase(fetchChatFeedback.fulfilled, (state, action) => {
            console.log('피드백 성공', action.payload.success)
            if (action.payload.success) {
                state.chatFeedback.modalFlag = false;

                // 피드백 성공 팝업
                state.alertPopup.basicModalFlag = true;
                state.alertPopup.popupTitle = ['피드백 전송이 완료되었어요.'];
                state.alertPopup.popupButtons = {
                    ok: {
                        title: '확인'
                    }
                }
            }
        });
        builder.addCase(fetchChatFeedback.rejected, (state, action) => {

        });
    }
})

export const {
    setBasicPopup,
    setChatFeedbackModal,
} = modalSlice.actions;