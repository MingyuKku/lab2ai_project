import { RootState } from "_redux/store";

// export const selectMemberSe = (state: RootState) => state.memberReducer.se;
export const selectRefreshToken = (state: RootState) => state.refreshTokenReducer.token;