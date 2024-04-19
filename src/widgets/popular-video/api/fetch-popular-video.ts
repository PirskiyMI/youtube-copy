import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from 'src/shared/api';
import { IVideo, VideoResponse } from 'src/entities/video';

interface FulfilledResponse {
   videoList: IVideo[];
   nextPageToken: string;
}

interface FetchArguments {
   token: string;
   maxResult?: number;
}

export const fetchPopularVideo = createAsyncThunk<
   FulfilledResponse,
   FetchArguments,
   { rejectValue: string }
>(
   'popularVideo/fetchPopularVideo',
   async ({ token, maxResult }: FetchArguments, { rejectWithValue }) => {
      try {
         const response = await request
            .get<VideoResponse>('/videos', {
               params: {
                  part: 'snippet,statistics,contentDetails',
                  chart: 'mostPopular',
                  maxResults: maxResult ? maxResult : 10,
                  regionCode: 'RU',
                  pageToken: token,
               },
            })
            .then((res) => ({
               videoList: res.data.items,
               nextPageToken: res.data.nextPageToken,
            }));

         return response;
      } catch (error) {
         return rejectWithValue('Error');
      }
   },
);
