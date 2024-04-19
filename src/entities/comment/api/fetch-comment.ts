import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from 'src/shared/api';

import { IComment } from '..';
import { CommentResponse } from '../lib/types';

interface FetchFulfilled {
   commentList: IComment[];
   nextPageToken: string;
   withReset?: boolean;
}

interface FetchComment {
   videoId: string;
   token: string | null;
   maxResults?: number;
}

export const fetchComment = createAsyncThunk<FetchFulfilled, FetchComment, { rejectValue: string }>(
   'comment/fetchComment',
   async ({ videoId, token, maxResults }: FetchComment, { rejectWithValue }) => {
      try {
         const res = await request
            .get<CommentResponse>('/commentThreads', {
               params: {
                  part: 'snippet,replies',
                  videoId: videoId,
                  pageToken: token ? token : '',
                  maxResults: maxResults ? maxResults : 20,
               },
            })
            .then((res) => ({
               commentList: res.data.items,
               nextPageToken: res.data.nextPageToken,
            }));

         return res;
      } catch (error) {
         return rejectWithValue('Ошибка комментарии');
      }
   },
);
