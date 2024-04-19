export const getIsAuth = (state: RootState) => !!state.user.user;
export const getUser = (state: RootState) => state.user.user;
export const getUserAccessToken = (state: RootState) => state.user.accessToken;
