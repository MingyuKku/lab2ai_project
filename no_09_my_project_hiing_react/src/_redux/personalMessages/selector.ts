import { RootState } from "_redux/store";

export const selectPersonalMessage = (state: RootState) => state.personalMessagesReducer.messages;