export const getIsAuth = (state: RootState) => !!state.userReducer.user;
export const getUser = (state: RootState) => state.userReducer.user;
export const getUserAccessToken = (state: RootState) => state.userReducer.accessToken;
