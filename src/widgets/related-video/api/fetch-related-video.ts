import { createAsyncThunk } from '@reduxjs/toolkit';
import { IVideo, VideoResponse } from 'src/entities/video';
import { request } from 'src/shared';

export const fetchRelatedVideo = createAsyncThunk<IVideo[], string, { rejectValue: string }>(
   'relatedVideo/fetchRelatedVideo',
   async (videoId: string, { rejectWithValue }) => {
      try {
         return await request
            .get<VideoResponse>('/search', {
               params: {
                  part: 'snippet',
                  relatedVideoId: videoId,
                  maxResults: 10,
                  type: 'video',
               },
            })
            .then((res) => res.data.items);
      } catch (error) {
         return rejectWithValue('Ошибка');
      }
   },
);
