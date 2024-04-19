import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from 'src/shared/api';
import { IVideo, VideoResponse } from 'src/entities/video';

export const fetchVideoBySearch = createAsyncThunk<IVideo[], string, { rejectValue: string }>(
   'videosBySearch/fetchVideoBySearch',
   async (searchValue, { rejectWithValue }) => {
      try {
         return await request
            .get<VideoResponse>('/search', {
               params: {
                  part: 'snippet',
                  maxResults: 10,
                  q: searchValue,
                  type: 'video',
               },
            })
            .then((res) => res.data.items);
      } catch (error) {
         return rejectWithValue('Ошибка при поиске видео');
      }
   },
);
