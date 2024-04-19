import { createSlice } from '@reduxjs/toolkit';

import { IVideo } from 'src/entities/video';
import { fetchPopularVideo } from 'src/widgets/popular-video/api/fetch-popular-video';

interface IState {
   status: 'pending' | 'fulfilled' | 'rejected' | null;
   error: string | null;
   data: {
      videoList: IVideo[];
      nextPageToken: string;
   };
}

const initialState: IState = {
   status: null,
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
            state.status = 'pending';
            state.error = null;
         })
         .addCase(
            fetchPopularVideo.fulfilled,
            (state, { payload: { videoList, nextPageToken } }) => {
               state.status = 'fulfilled';
               state.data.videoList = [...state.data.videoList, ...videoList];
               state.data.nextPageToken = nextPageToken;
            },
         )
         .addCase(fetchPopularVideo.rejected, (state, { payload }) => {
            state.status = 'rejected';
            state.error = payload!;
         });
   },
});

export const popularVideoReducer = popularVideoSlice.reducer;
export const popularVideoActions = popularVideoSlice.actions;
