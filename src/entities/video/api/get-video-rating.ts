import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from 'src/shared/api';

interface Request {
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
         .get<Request>('/videos/getRating', {
            params: { id: videoId },
            headers: { Authorization: `Bearer ${accessToken}` },
         })
         .then((res) => res.data.items[0].rating as 'like' | 'dislike' | 'none' | 'unspecified');
   } catch (error) {
      return rejectWithValue(`${error}`);
   }
});
