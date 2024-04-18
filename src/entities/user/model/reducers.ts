import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Auth } from '../api/auth';

interface IUser {
   name: string;
   imgURL: string;
}

interface IUserSlice {
   accessToken: string | null;
   loading: boolean;
   user: IUser | null;
}

const initialState: IUserSlice = {
   accessToken: localStorage.getItem('access-token') ? localStorage.getItem('access-token') : null,
   loading: false,
   user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      startLoading: (state) => {
         state.loading = true;
      },
      setUser: (
         state,
         { payload: { accessToken, user } }: PayloadAction<{ accessToken: string; user: IUser }>,
      ) => {
         state.accessToken = accessToken;
         state.user = user;
      },
      clearUser: (state) => {
         state.accessToken = null;
         state.user = null;
      },
      endLoading: (state) => {
         state.loading = false;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(Auth.pending, (state) => {
            state.loading = true;
         })
         .addCase(Auth.fulfilled, (state, { payload }) => {
            state.accessToken = payload.token;
            state.user = { name: payload.displayName, imgURL: payload.photoURL };
         });
   },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
