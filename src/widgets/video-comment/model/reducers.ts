import { createSlice } from '@reduxjs/toolkit';
import { IComment, fetchComment } from 'src/entities/comment';
import { addComment } from 'src/features/send-comment/api/add-comment';

interface IState {
   status: 'pending' | 'fulfilled' | 'rejected' | null;
   error: string | null;
   data: {
      commentList: IComment[];
      nextPageToken: string;
   };
}

const initialState: IState = {
   status: null,
   error: null,
   data: {
      commentList: [],
      nextPageToken: '',
   },
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
            state.status = 'pending';
            state.error = null;
         })
         .addCase(fetchComment.fulfilled, (state, { payload: { commentList, nextPageToken } }) => {
            state.status = 'fulfilled';
            state.data.commentList = [...state.data.commentList, ...commentList];
            state.data.nextPageToken = nextPageToken;
         })
         .addCase(fetchComment.rejected, (state, { payload }) => {
            state.status = 'rejected';
            state.error = payload!;
         })
         .addCase(addComment.pending, (state) => {
            state.status = 'pending';
            state.error = null;
         })
         .addCase(addComment.fulfilled, (state, { payload: { comment } }) => {
            state.status = 'fulfilled';
            state.data.commentList = [comment, ...state.data.commentList];
         })
         .addCase(addComment.rejected, (state, { payload }) => {
            state.status = 'rejected';
            state.error = payload!;
         });
   },
});

export const videoCommentActions = videoCommentSlice.actions;
export const videoCommentReducer = videoCommentSlice.reducer;
