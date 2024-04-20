import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from 'src/shared/api';
import { VideoWithDetailsResponse } from 'src/entities/video/video-details';

import { VideoListItem } from './slice';

interface Response {
   videoList: VideoListItem[];
   nextPageToken: string;
}

export const fetchFavoriteVideo = createAsyncThunk<
   Response,
   void,
   { rejectValue: string; state: RootState }
>('favoriteVideos/fetchFavoriteVide', async (_, { rejectWithValue, getState }) => {
   const accessToken = getState().user.accessToken;
   const nextPageToken = getState().favoriteVideos.data?.nextPageToken;

   try {
      return await request
         .get<VideoWithDetailsResponse>('/videos', {
            params: {
               part: 'snippet,statistics,contentDetails',
               pageToken: nextPageToken ? nextPageToken : '',
               myRating: 'like',
               maxResults: 16,
            },
            headers: { Authorization: `Bearer ${accessToken}` },
         })
         .then((res) => {
            const { nextPageToken, items } = res.data;

            const videoList = items.map((el) => ({
               id: el.id,
               channelTitle: el.snippet.channelTitle,
               title: el.snippet.title,
               thumbnail: el.snippet.thumbnails.medium,
               duration: el.contentDetails.duration,
               viewCount: el.statistics.viewCount,
               publishedAt: el.snippet.publishedAt,
            }));

            return { videoList, nextPageToken };
         });
   } catch (error) {
      return rejectWithValue('Ошибка при запросе понравившихся видео');
   }
});
