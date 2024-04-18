import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from 'src/shared';
import { IComment } from 'src/entities/comment';

interface FulfilledResponse {
   comment: IComment;
}
interface FetchArguments {
   videoId: string;
   text: string;
}

export const addComment = createAsyncThunk<
   FulfilledResponse,
   FetchArguments,
   { rejectValue: string; state: RootState }
>('comment/addComment', async ({ videoId, text }, { rejectWithValue, getState }) => {
   const accessToken = getState().userReducer.accessToken;
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
      const response = await request
         .post<Root>('/commentThreads', params, {
            params: { part: 'snippet' },
            headers: { Authorization: `Bearer ${accessToken}` },
         })
         .then((res) => ({
            comment: res.data,
         }));
      return response;
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
