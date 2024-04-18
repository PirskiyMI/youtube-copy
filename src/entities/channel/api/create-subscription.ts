import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from 'src/shared';

export const createSubscription = createAsyncThunk<
   void,
   string,
   { rejectValue: string; state: RootState }
>('channel/createSubscription', async (channelId, { rejectWithValue, getState }) => {
   const accessToken = getState().userReducer.accessToken;
   const params = { snippet: { resourceId: { kind: 'youtube#channel', channelId } } };

   try {
      await request.post('/subscriptions', params, {
         params: {
            part: 'snippet',
         },
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
      });
   } catch (error) {
      return rejectWithValue('Ошибка при попытке создать подписку');
   }
});
