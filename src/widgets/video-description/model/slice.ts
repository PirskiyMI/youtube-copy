import { createSlice } from '@reduxjs/toolkit';

import { fetchVideoDetails } from './thunks';

export interface VideoDetails {
   channelId: string;
   title: string;
   description: string;
   publishedAt: string;
   likeCount: string;
   viewCount: string;
}

interface State {
   details: VideoDetails | null;
   loading: boolean;
   error: string | null;
}

const initialState: State = {
   details: null,
   loading: false,
   error: null,
};

const videoDescriptionSlice = createSlice({
   name: 'videoDescription',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchVideoDetails.pending, (state) => {
            state.error = null;
            state.loading = true;
         })
         .addCase(fetchVideoDetails.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.details = payload;
         })
         .addCase(fetchVideoDetails.rejected, (state, { payload }) => {
            state.loading = false;
            if (payload) state.error = payload;
         });
   },
});

export const videoDescriptionReducer = videoDescriptionSlice.reducer;
