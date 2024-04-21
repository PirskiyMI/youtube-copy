import { createSelector } from '@reduxjs/toolkit';

const getChannel = (state: RootState) => state.channel;

export const getChannelData = createSelector([getChannel], (channel) => ({
   title: channel.data.title,
   subscriberCount: channel.data.subscriberCount,
}));

export const getSubscriptionStatus = createSelector(
   [getChannel],
   (channel) => channel.data.subscriptionStatus,
);
export const getSubscriptionStatusLoadingSelector = createSelector(
   [getChannel],
   (selector) => selector.loading,
);
