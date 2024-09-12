import { RootState } from "_redux/store";

export const selectBasicModal = (state: RootState) => state.modalReducer.alertPopup;
export const selectChatFeedbackModal = (state: RootState) => state.modalReducer.chatFeedback;