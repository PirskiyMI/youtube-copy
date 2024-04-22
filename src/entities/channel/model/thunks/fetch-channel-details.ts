import { createAsyncThunk } from '@reduxjs/toolkit';

import { request } from 'src/shared/api';

import { ChannelResponse } from '../../types';

export const fetchChannelDetails = createAsyncThunk<
   { title: string; subscriberCount: string },
   string,
   { rejectValue: string }
>('channel/fetchChannelDetails', async (channelId, { rejectWithValue }) => {
   try {
      const response = await request
         .get<ChannelResponse>('/channels', {
            params: {
               part: 'snippet,statistics,contentDetails',
               id: channelId,
            },
         })
         .then((res) => {
            const { snippet, statistics } = res.data.items[0];
            const title = snippet.title;
            const subscriberCount = statistics.subscriberCount;

            return { title, subscriberCount };
         });

      return response;
   } catch (error) {
      return rejectWithValue('Ошибка при запросе информации о канале');
   }
});
