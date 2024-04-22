import { createSelector } from '@reduxjs/toolkit';

const getSelector = (state: RootState) => state.channel;
const getSelectorData = (state: RootState) => state.channel.data;

export const getChannelTitleSelector = createSelector(
   [getSelectorData],
   (selector) => selector.title,
);

export const getChannelSubscriberCountSelector = createSelector(
   [getSelectorData],
   (selector) => selector.subscriberCount,
);

export const getChannelSubscriptionStatusSelector = createSelector(
   [getSelectorData],
   (selector) => selector.subscriptionStatus,
);

export const getChannelLoadingSelector = createSelector(
   [getSelector],
   (selector) => selector.loading,
);

export const getChannelErrorSelector = createSelector([getSelector], (selector) => selector.error);
