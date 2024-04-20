import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from 'src/shared/api';
import {
   VideoResponse,
   fetchVideoDetails,
   formatVideoDetails,
} from 'src/entities/video/video-details';

import { VideoListItem } from './slice';

export const fetchRelatedVideo = createAsyncThunk<VideoListItem[], string, { rejectValue: string }>(
   'relatedVideo/fetchRelatedVideo',
   async (searchValue, { rejectWithValue }) => {
      const formattedSearchValue = searchValue.replace(/' '/g, '+');

      try {
         return await request
            .get<VideoResponse>('/search', {
               params: {
                  part: 'snippet',
                  q: formattedSearchValue,
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
                        publishedAt,
                        thumbnails: { medium },
                     },
                  } = el;
                  return {
                     id: videoId,
                     channelTitle,
                     title,
                     publishedAt,
                     thumbnail: medium,
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
         return rejectWithValue('Ошибка при попытке получить список связанных видео');
      }
   },
);
