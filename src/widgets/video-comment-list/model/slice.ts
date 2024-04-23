import { createSlice } from '@reduxjs/toolkit';

import { TopLevelCommentProps } from 'src/entities/comment';
import { addComment } from 'src/features/send-comment-form';

import { fetchComment } from './thunks';

interface Data {
   commentList: TopLevelCommentProps[];
   nextPageToken: string;
}

interface State {
   data: Data;
   loading: boolean;
   error: string | null;
}

const initialState: State = {
   data: {
      commentList: [],
      nextPageToken: '',
   },
   loading: false,
   error: null,
};

const videoCommentSlice = createSlice({
   name: 'videoComment',
   initialState,
   reducers: {
      clearCommentList: (state) => {
         state.data.commentList = [];
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchComment.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchComment.fulfilled, (state, { payload: { commentList, nextPageToken } }) => {
            state.loading = false;
            state.data.commentList = [...state.data.commentList, ...commentList];
            state.data.nextPageToken = nextPageToken;
         })
         .addCase(fetchComment.rejected, (state, { payload }) => {
            state.loading = false;
            if (payload) state.error = payload;
         })
         .addCase(addComment.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(addComment.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data.commentList = [payload, ...state.data.commentList];
         })
         .addCase(addComment.rejected, (state, { payload }) => {
            state.loading = false;
            if (payload) state.error = payload;
         });
   },
});

export const videoCommentActions = videoCommentSlice.actions;
export const videoCommentReducer = videoCommentSlice.reducer;
