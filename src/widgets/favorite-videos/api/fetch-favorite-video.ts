import { createAsyncThunk } from '@reduxjs/toolkit';
import { IVideo, VideoResponse } from 'src/entities/video';
import { request } from 'src/shared';

export const fetchFavoriteVideo = createAsyncThunk<
   { videoList: IVideo[]; nextPageToken: string },
   void,
   { rejectValue: string; state: RootState }
>('favoriteVideos/fetchFavoriteVide', async (_, { rejectWithValue, getState }) => {
   const accessToken = getState().user.accessToken;
   const nextPageToken = getState().favoriteVideos.data?.nextPageToken;

   try {
      return await request
         .get<VideoResponse>('/videos', {
            params: {
               part: 'snippet,statistics,contentDetails',
               pageToken: nextPageToken ? nextPageToken : '',
               myRating: 'like',
               maxResults: 16,
            },
            headers: { Authorization: `Bearer ${accessToken}` },
         })
         .then((res) => ({
            videoList: res.data.items,
            nextPageToken: res.data.nextPageToken,
         }));
   } catch (error) {
      return rejectWithValue('Ошибка при запросе понравившихся видео');
   }
});
