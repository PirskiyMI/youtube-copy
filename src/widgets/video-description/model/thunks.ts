import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from 'src/shared/api';
import { VideoWithDetailsResponse } from 'src/entities/video/video-details';

import { VideoDetails } from './slice';

export const fetchVideoDetails = createAsyncThunk<VideoDetails, string, { rejectValue: string }>(
   'videoDescription/fetchVideoDetails',
   async (videoId, { rejectWithValue }) => {
      try {
         return await request
            .get<VideoWithDetailsResponse>('/videos', {
               params: {
                  part: 'snippet,statistics',
                  id: videoId,
               },
            })
            .then((res) => {
               const {
                  snippet: { channelId, title, description, publishedAt },
                  statistics: { viewCount, likeCount },
               } = res.data.items[0];

               return {
                  channelId,
                  title,
                  description,
                  likeCount,
                  viewCount,
                  publishedAt,
               };
            });
      } catch (error) {
         return rejectWithValue('Ошибка при попытке получить описание видео');
      }
   },
);
