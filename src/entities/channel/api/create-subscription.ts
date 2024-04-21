import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from 'src/shared/api';
import { fetchSubscriptionStatus } from './fetch-subscription-status';

export const createSubscription = createAsyncThunk<
   void,
   string,
   { rejectValue: string; state: RootState; dispatch: AppDispatch }
>('channel/createSubscription', async (channelId, { rejectWithValue, getState, dispatch }) => {
   const accessToken = getState().user.accessToken;
   const params = { snippet: { resourceId: { kind: 'youtube#channel', channelId } } };

   try {
      await request
         .post('/subscriptions', params, {
            params: {
               part: 'snippet',
            },
            headers: {
               Authorization: `Bearer ${accessToken}`,
            },
         })
         .then(() => {
            setTimeout(() => {
               dispatch(fetchSubscriptionStatus(channelId));
            }, 1000);
         });
   } catch (error) {
      return rejectWithValue('Ошибка при попытке создать подписку');
   }
});
