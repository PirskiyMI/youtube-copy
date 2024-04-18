import { createSlice } from '@reduxjs/toolkit';
import { IVideo } from 'src/entities/video';
import { fetchVideoBySearch } from '../api/fetch-video-by-search';

interface State {
   videoList: IVideo[];
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
