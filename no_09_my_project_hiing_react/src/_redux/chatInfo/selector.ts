import { RootState } from "_redux/store";

export const selectChatRoomInfo = (state: RootState) => state.chatRoomInfoReducer.info;