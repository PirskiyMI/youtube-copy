import { createSlice } from '@reduxjs/toolkit';

import { rate } from 'src/shared/lib/types';

import { getVideoRating, setVideoRating } from './thunks';

interface State {
   rating: rate;
   loading: boolean;
   error: string | null;
}

const initialState: State = {
   rating: 'none',
   loading: false,
   error: null,
};

const videoRatingSlice = createSlice({
   name: 'videoRating',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(setVideoRating.pending, (state) => {
            state.error = null;
            state.loading = true;
         })
         .addCase(setVideoRating.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.rating = payload;
         })
         .addCase(setVideoRating.rejected, (state, { payload }) => {
            state.loading = false;
            if (payload) state.error = payload;
         })
         .addCase(getVideoRating.pending, (state) => {
            state.error = null;
            state.loading = true;
         })
         .addCase(getVideoRating.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.rating = payload;
         })
         .addCase(getVideoRating.rejected, (state, { payload }) => {
            state.loading = false;
            if (payload) state.error = payload;
         });
   },
});

export const videoRatingReducer = videoRatingSlice.reducer;
