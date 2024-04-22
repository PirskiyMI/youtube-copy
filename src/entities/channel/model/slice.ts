import { createSlice } from '@reduxjs/toolkit';
import { fetchSubscriptionStatus } from './thunks/fetch-subscription-status';
import { fetchChannelDetails } from './thunks/fetch-channel-details';
import { createSubscription } from './thunks';

interface Data {
   title: string;
   subscriberCount: string;
   subscriptionStatus: string;
}

interface State {
   data: Data;
   loading: boolean;
   error: string | null;
}

const initialState: State = {
   data: {
      title: '',
      subscriberCount: '',
      subscriptionStatus: '',
   },
   loading: false,
   error: null,
};

const channelSlice = createSlice({
   name: 'channel',
   initialState,
   reducers: {
      clearChannel: (state) => {
         state.data = { title: '', subscriberCount: '', subscriptionStatus: '' };
         state.error = null;
      },
      clearSubscriptionStatus: (state) => {
         state.data.subscriptionStatus = '';
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchSubscriptionStatus.pending, (state) => {
            state.error = null;
         })
         .addCase(fetchSubscriptionStatus.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data.subscriptionStatus = payload;
         })
         .addCase(fetchSubscriptionStatus.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
         })
         .addCase(fetchChannelDetails.pending, (state) => {
            state.error = null;
         })
         .addCase(fetchChannelDetails.fulfilled, (state, { payload }) => {
            state.data = { ...state.data, ...payload };
         })
         .addCase(fetchChannelDetails.rejected, (state, { payload }) => {
            if (payload) state.error = payload;
         })
         .addCase(createSubscription.pending, (state) => {
            state.error = null;
            state.loading = true;
         })
         .addCase(createSubscription.rejected, (state, { payload }) => {
            state.loading = false;
            if (payload) state.error = payload;
         });
   },
});

export const channelReducer = channelSlice.reducer;
export const channelActions = channelSlice.actions;
