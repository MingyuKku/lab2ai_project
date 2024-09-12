import { configureStore } from '@reduxjs/toolkit';
import { memberSlice } from './member/slice';
import { chatInfoSlice } from './chatInfo/slice';
import { personalMessagesSlice } from './personalMessages/slice';
import { refreshTokenSlice } from './refreshToken/slice';
import { modalSlice } from './modal/slice';
import { homeCharactorSlice } from './home-character/slice';

const store = configureStore({
    reducer: {
        memberReducer: memberSlice.reducer,
        chatRoomInfoReducer: chatInfoSlice.reducer,
        personalMessagesReducer: personalMessagesSlice.reducer,
        refreshTokenReducer: refreshTokenSlice.reducer,
        modalReducer: modalSlice.reducer,
        homeCharactorReducer: homeCharactorSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// getState와 dispatch를 내보내기
export const getState: () => RootState = store.getState;
export const dispatch: AppDispatch = store.dispatch;

export default store;