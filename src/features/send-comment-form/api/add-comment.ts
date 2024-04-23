import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from 'src/shared/api';
import { TopLevelCommentProps } from 'src/entities/comment';

interface FetchArguments {
   videoId: string;
   text: string;
}

export const addComment = createAsyncThunk<
   TopLevelCommentProps,
   FetchArguments,
   { rejectValue: string; state: RootState }
>('comment/addComment', async ({ videoId, text }, { rejectWithValue, getState }) => {
   const accessToken = getState().user.accessToken;
   try {
      const params = {
         snippet: {
            videoId,
            topLevelComment: {
               snippet: {
                  textOriginal: text,
               },
            },
         },
      };
      const comment = await request
         .post<Root>('/commentThreads', params, {
            params: { part: 'snippet' },
            headers: { Authorization: `Bearer ${accessToken}` },
         })
         .then((res) => {
            const id = res.data.id;
            const { authorDisplayName, publishedAt, textDisplay } =
               res.data.snippet.topLevelComment.snippet;

            return {
               id,
               authorDisplayName,
               publishedAt,
               textDisplay,
               replies: undefined,
            };
         });
      return comment;
   } catch (error) {
      return rejectWithValue('Ошибка при создании комментария');
   }
});

export interface Root {
   kind: string;
   etag: string;
   id: string;
   snippet: Snippet;
}

export interface Snippet {
   channelId: string;
   videoId: string;
   topLevelComment: TopLevelComment;
   canReply: boolean;
   totalReplyCount: number;
   isPublic: boolean;
}

export interface TopLevelComment {
   kind: string;
   etag: string;
   id: string;
   snippet: Snippet2;
}

export interface Snippet2 {
   channelId: string;
   videoId: string;
   textDisplay: string;
   textOriginal: string;
   authorDisplayName: string;
   authorProfileImageUrl: string;
   authorChannelUrl: string;
   authorChannelId: AuthorChannelId;
   canRate: boolean;
   viewerRating: string;
   likeCount: number;
   publishedAt: string;
   updatedAt: string;
}

export interface AuthorChannelId {
   value: string;
}
