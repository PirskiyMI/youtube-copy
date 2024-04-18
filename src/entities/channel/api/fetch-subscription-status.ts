import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from 'src/shared';

export const fetchSubscriptionStatus = createAsyncThunk<
   string,
   string,
   { rejectValue: string; state: RootState }
>('channel/fetchSubscriptionStatus', async (channelId, { rejectWithValue, getState }) => {
   const accessToken = getState().userReducer.accessToken;
   try {
      const response = await request
         .get('/subscriptions', {
            params: {
               part: 'snippet',
               forChannelId: channelId,
               mine: true,
            },
            headers: { Authorization: `Bearer ${accessToken}` },
         })
         .then((res) => {
            if (res.data.items.length === 0) return '';
            return res.data.items[0].id;
         });
      return response;
   } catch (error) {
      return rejectWithValue('Ошибка при запросе статуса подписки');
   }
});
