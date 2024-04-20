import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from 'src/shared/api';
import { VideoWithDetailsResponse, formatVideoDetails } from 'src/entities/video/video-details';

import { VideoListItem } from './slice';

interface FulfilledResponse {
   videoList: VideoListItem[];
   nextPageToken: string;
}

interface FetchArguments {
   maxResults?: number;
}

export const fetchPopularVideo = createAsyncThunk<
   FulfilledResponse,
   FetchArguments,
   { rejectValue: string; state: RootState }
>('popularVideo/fetchPopularVideo', async ({ maxResults }, { rejectWithValue, getState }) => {
   const nextPageToken = getState().popularVideo.data.nextPageToken;

   try {
      const response = await request
         .get<VideoWithDetailsResponse>('/videos', {
            params: {
               part: 'snippet,statistics,contentDetails',
               chart: 'mostPopular',
               maxResults: maxResults ? maxResults : 10,
               regionCode: 'RU',
               pageToken: nextPageToken,
            },
         })
         .then((res) => {
            const { nextPageToken, items } = res.data;

            const resVideoList = items.map((el) => {
               const details = formatVideoDetails({
                  duration: el.contentDetails.duration,
                  viewCount: el.statistics.viewCount,
                  publishedAt: el.snippet.publishedAt,
               });

               return {
                  id: el.id,
                  channelTitle: el.snippet.channelTitle,
                  title: el.snippet.title,
                  thumbnail: el.snippet.thumbnails.medium,
                  ...details,
               };
            });

            return { videoList: resVideoList, nextPageToken };
         });

      return response;
   } catch (error) {
      return rejectWithValue('Error');
   }
});
