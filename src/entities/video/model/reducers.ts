import { createSlice } from '@reduxjs/toolkit';
import { getVideoRating, setVideoRating } from '../api';

interface VideoState {
   rating: 'like' | 'dislike' | 'none' | 'unspecified';
   loading: boolean;
   error: string | null;
}

const initialState: VideoState = {
   rating: 'none',
   loading: false,
   error: null,
};

const videoSlice = createSlice({
   name: 'video',
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

export const videoReducer = videoSlice.reducer;
