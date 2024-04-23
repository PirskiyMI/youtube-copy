import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from 'src/shared/api';
import { CommentResponse, TopLevelCommentProps } from 'src/entities/comment/types';

interface FetchFulfilled {
   commentList: TopLevelCommentProps[];
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
            .then((res) => {
               const commentList = res.data.items.map((el) => {
                  const id = el.id;
                  const totalReplyCount = el.snippet.totalReplyCount;
                  const { authorDisplayName, textDisplay, publishedAt } =
                     el.snippet.topLevelComment.snippet;
                  const replies = el.replies
                     ? el.replies.comments.map((el) => {
                          const id = el.id;
                          const { authorDisplayName, publishedAt, textDisplay } = el.snippet;
                          return { id, authorDisplayName, publishedAt, textDisplay };
                       })
                     : undefined;

                  return {
                     id,
                     totalReplyCount,
                     authorDisplayName,
                     textDisplay,
                     publishedAt,
                     replies,
                  };
               });

               return {
                  commentList,
                  nextPageToken: res.data.nextPageToken,
               };
            });

         return res;
      } catch (error) {
         return rejectWithValue('Ошибка при попытке получить комментарии');
      }
   },
);
