import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from 'src/shared';

export const deleteSubscription = createAsyncThunk<
   void,
   string,
   { rejectValue: string; state: RootState }
>('channel/deleteSubscription', async (channelId, { rejectWithValue, getState }) => {
   const accessToken = getState().userReducer.accessToken;
   try {
      await request.delete('/subscriptions', {
         params: { id: channelId },
         headers: { Authorization: `Bearer ${accessToken}` },
      });
   } catch (error) {
      return rejectWithValue('Ошибка при попытке отпсаться от канала');
   }
});
