import { createSlice } from '@reduxjs/toolkit';

import { VideoBySearchPreviewDetails } from 'src/entities/video/video-by-search-preview';

import { fetchVideoBySearch } from './thunks';

export interface VideoListItem extends VideoBySearchPreviewDetails {
   id: string;
}

interface State {
   videoList: VideoListItem[];
   loading: boolean;
   error: string | null;
}

const initialState: State = {
   videoList: [],
   loading: false,
   error: null,
};

const videosBySearchSlice = createSlice({
   name: 'videosBySearch',
   initialState,
   reducers: {
      clearVideoList: (state) => {
         state.videoList = [];
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchVideoBySearch.pending, (state) => {
            state.error = null;
            state.loading = true;
         })
         .addCase(fetchVideoBySearch.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.videoList = payload;
         })
         .addCase(fetchVideoBySearch.rejected, (state, { payload }) => {
            state.loading = false;
            if (payload) state.error = payload;
         });
   },
});

export const videosBySearchActions = videosBySearchSlice.actions;
export const videosBySearchReducer = videosBySearchSlice.reducer;
