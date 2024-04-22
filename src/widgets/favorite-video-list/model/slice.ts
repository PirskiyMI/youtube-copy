import { createSlice } from '@reduxjs/toolkit';

import { VideoPreviewDetails } from 'src/entities/video/video-preview';

import { fetchFavoriteVideo } from './thunks';

export interface VideoListItem extends VideoPreviewDetails {
   id: string;
}

interface Data {
   videoList: VideoListItem[];
   nextPageToken: string;
}

interface State {
   data: Data;
   loading: boolean;
   error: string | null;
}

const initialState: State = {
   data: { videoList: [], nextPageToken: '' },
   loading: false,
   error: null,
};

const favoriteVideoSlice = createSlice({
   name: 'favoriteVideo',
   initialState,
   reducers: {
      resetState: (state) => {
         state.data = { videoList: [], nextPageToken: '' };
         state.loading = false;
         state.error = null;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchFavoriteVideo.pending, (state) => {
            state.error = null;
            state.loading = true;
         })
         .addCase(fetchFavoriteVideo.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data = payload;
         })
         .addCase(fetchFavoriteVideo.rejected, (state, { payload }) => {
            state.loading = false;
            if (payload) state.error = payload;
         });
   },
});

export const favoriteVideoActions = favoriteVideoSlice.actions;
export const favoriteVideoReducer = favoriteVideoSlice.reducer;
