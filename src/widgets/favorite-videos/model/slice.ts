import { createSlice } from '@reduxjs/toolkit';

import { VideoPreviewProps } from 'src/entities/video/video-preview';

import { fetchFavoriteVideo } from './thunks';

export interface VideoListItem extends VideoPreviewProps {
   id: string;
}

interface Data {
   videoList: VideoListItem[];
   nextPageToken: string;
}

interface State {
   data: Data | null;
   loading: boolean;
   error: string | null;
}

const initialState: State = {
   data: null,
   loading: false,
   error: null,
};

const favoriteVideosSlice = createSlice({
   name: 'favoriteVideos',
   initialState,
   reducers: {
      resetState: (state) => {
         state.data = null;
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
            if (state.data) {
               state.data.nextPageToken = payload.nextPageToken;
               state.data.videoList = [...state.data.videoList, ...payload.videoList];
            } else {
               state.data = payload;
            }
         })
         .addCase(fetchFavoriteVideo.rejected, (state, { payload }) => {
            state.loading = false;
            if (payload) state.error = payload;
         });
   },
});

export const favoriteVideosActions = favoriteVideosSlice.actions;
export const favoriteVideosReducer = favoriteVideosSlice.reducer;