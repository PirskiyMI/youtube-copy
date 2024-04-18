import { createSlice } from '@reduxjs/toolkit';
import { IVideo } from 'src/entities/video';
import { fetchRelatedVideo } from '../api/fetch-related-video';

interface IState {
   status: 'pending' | 'fulfilled' | 'rejected' | null;
   videoList: IVideo[];
   error: string | null;
}

const initialState: IState = {
   status: null,
   error: null,
   videoList: [],
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
            state.status = 'pending';
         })
         .addCase(fetchRelatedVideo.fulfilled, (state, { payload }) => {
            state.status = 'fulfilled';
            state.videoList = payload;
         })
         .addCase(fetchRelatedVideo.rejected, (state, { payload }) => {
            state.status = 'rejected';
            state.error = payload!;
         });
   },
});

export const relatedVideoActions = relatedVideoSlice.actions;
export const relatedVideoReducer = relatedVideoSlice.reducer;
