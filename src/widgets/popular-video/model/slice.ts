import { createSlice } from '@reduxjs/toolkit';

import { VideoPreviewProps } from 'src/entities/video/video-preview';
import { fetchPopularVideo } from 'src/widgets/popular-video/model/thunks';

export interface VideoListItem extends VideoPreviewProps {
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
   loading: false,
   error: null,
   data: {
      videoList: [],
      nextPageToken: '',
   },
};

const popularVideoSlice = createSlice({
   name: 'popular-video',
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
            state.error = payload!;
         });
   },
});

export const popularVideoReducer = popularVideoSlice.reducer;
export const popularVideoActions = popularVideoSlice.actions;
