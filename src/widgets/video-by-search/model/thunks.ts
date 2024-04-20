import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from 'src/shared/api';
import {
   VideoResponse,
   fetchVideoDetails,
   formatVideoDetails,
} from 'src/entities/video/video-details';

import { VideoListItem } from './slice';

export const fetchVideoBySearch = createAsyncThunk<
   VideoListItem[],
   string,
   { rejectValue: string }
>('videosBySearch/fetchVideoBySearch', async (searchValue, { rejectWithValue }) => {
   try {
      return await request
         .get<VideoResponse>('/search', {
            params: {
               part: 'snippet',
               q: searchValue,
               maxResults: 10,
               type: 'video',
            },
         })
         .then((res) => {
            return res.data.items.map((el) => {
               const {
                  id: { videoId },
                  snippet: {
                     channelTitle,
                     title,
                     description,
                     publishedAt,
                     thumbnails: { high },
                  },
               } = el;
               return {
                  id: videoId,
                  channelTitle,
                  title,
                  description,
                  publishedAt,
                  thumbnail: high,
               };
            });
         })
         .then((res) => {
            return res.map(async (el) => {
               const statistics = await fetchVideoDetails(el.id);

               const details = formatVideoDetails({
                  publishedAt: el.publishedAt,
                  ...statistics,
               });

               return { ...el, ...details };
            });
         })
         .then((res) => Promise.all([...res]));
   } catch (error) {
      return rejectWithValue('Ошибка при поиске видео');
   }
});
