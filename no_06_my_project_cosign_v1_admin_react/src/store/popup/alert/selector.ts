import { RootState } from 'store/_types';

export const selectAlert = (state: RootState) => state.alertReducer;