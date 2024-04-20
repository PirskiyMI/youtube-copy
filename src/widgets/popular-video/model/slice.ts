import { createSlice } from '@reduxjs/toolkit';

import { VideoPreviewDetails } from 'src/entities/video/video-preview';
import { fetchPopularVideo } from 'src/widgets/popular-video/model/thunks';

export interface VideoListItem extends VideoPreviewDetails {
   id: string;
}

interface IState {
   data: {
      videoList: VideoListItem[];
      nextPageToken: string;
   };
   loading: boolean;
   error: string | null;
}

const initialState: IState = {
   data: {
      videoList: [],
      nextPageToken: '',
   },
   loading: false,
   error: null,
};

const popularVideoSlice = createSlice({
   name: 'popularVideo',
   initialState,
   reducers: {
      clearVideoList: (state) => {
         state.data.videoList = [];
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchPopularVideo.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(
            fetchPopularVideo.fulfilled,
            (state, { payload: { videoList, nextPageToken } }) => {
               state.loading = false;
               state.data.videoList = [...state.data.videoList, ...videoList];
               state.data.nextPageToken = nextPageToken;
            },
         )
         .addCase(fetchPopularVideo.rejected, (state, { payload }) => {
            state.loading = false;
            if (payload) state.error = payload;
         });
   },
});

export const popularVideoReducer = popularVideoSlice.reducer;
export const popularVideoActions = popularVideoSlice.actions;
