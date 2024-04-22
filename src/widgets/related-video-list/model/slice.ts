import { createSlice } from '@reduxjs/toolkit';

import { VideoPreviewRelatedProps } from 'src/entities/video/video-preview-related';

import { fetchRelatedVideo } from './thunks';

export interface VideoListItem extends VideoPreviewRelatedProps {
   id: string;
}

interface IState {
   videoList: VideoListItem[];
   loading: boolean;
   error: string | null;
}

const initialState: IState = {
   videoList: [],
   loading: false,
   error: null,
};

const relatedVideoSlice = createSlice({
   name: 'relatedVideo',
   initialState,
   reducers: {
      clearVideoList: (state) => {
         state.videoList = [];
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchRelatedVideo.pending, (state) => {
            state.error = null;
            state.loading = true;
         })
         .addCase(fetchRelatedVideo.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.videoList = payload;
         })
         .addCase(fetchRelatedVideo.rejected, (state, { payload }) => {
            state.loading = false;
            if (payload) state.error = payload;
         });
   },
});

export const relatedVideoActions = relatedVideoSlice.actions;
export const relatedVideoReducer = relatedVideoSlice.reducer;
