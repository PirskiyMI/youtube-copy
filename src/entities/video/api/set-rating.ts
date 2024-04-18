import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from 'src/shared';

export const setVideoRating2 = async ({
   videoId,
   accessToken,
   rate,
}: {
   videoId: string;
   accessToken: string;
   rate: 'like' | 'dislike' | 'none';
}) => {
   await request.post('/videos/rate', undefined, {
      params: { id: videoId, rating: rate },
      headers: {
         Authorization: `Bearer ${accessToken}`,
      },
   });
};

export const setVideoRating = createAsyncThunk<
   'like' | 'dislike' | 'none',
   { videoId: string; rate: 'like' | 'dislike' | 'none' },
   { rejectValue: string; state: RootState }
>('video/addLikeVideo', async ({ videoId, rate }, { rejectWithValue, getState }) => {
   const accessToken = getState().userReducer.accessToken;
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
