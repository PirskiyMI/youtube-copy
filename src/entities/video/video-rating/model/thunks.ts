import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from 'src/shared/api';

export const setVideoRating = createAsyncThunk<
   'like' | 'dislike' | 'none',
   { videoId: string; rate: 'like' | 'dislike' | 'none' },
   { rejectValue: string; state: RootState }
>('video/addLikeVideo', async ({ videoId, rate }, { rejectWithValue, getState }) => {
   const accessToken = getState().user.accessToken;
   try {
      await request.post('/videos/rate', undefined, {
         params: { id: videoId, rating: rate },
         headers: { Authorization: `Bearer ${accessToken}` },
      });
      return rate;
   } catch (error) {
      return rejectWithValue(`${error}`);
   }
});

interface VideoRatingRequest {
   kind: string;
   etag: string;
   items: [
      {
         videoId: string;
         rating: string;
      },
   ];
}

export const getVideoRating = createAsyncThunk<
   'like' | 'dislike' | 'none' | 'unspecified',
   string,
   { rejectValue: string; state: RootState }
>('video/getVideoRating', async (videoId, { rejectWithValue, getState }) => {
   const accessToken = getState().user.accessToken;
   try {
      return await request
         .get<VideoRatingRequest>('/videos/getRating', {
            params: { id: videoId },
            headers: { Authorization: `Bearer ${accessToken}` },
         })
         .then((res) => res.data.items[0].rating as 'like' | 'dislike' | 'none' | 'unspecified');
   } catch (error) {
      return rejectWithValue(`${error}`);
   }
});
