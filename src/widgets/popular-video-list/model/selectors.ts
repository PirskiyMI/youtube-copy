import { createSelector } from '@reduxjs/toolkit';

const getSelector = (state: RootState) => state.popularVideo;

export const getPopularVideoListSelector = createSelector(
   [getSelector],
   (selector) => selector.data.videoList,
);

export const getPopularVideoNextPageToken = createSelector(
   [getSelector],
   (selector) => selector.data.nextPageToken,
);

export const getPopularVideoLoading = createSelector([getSelector], (selector) => selector.loading);

export const getPopularVideoError = createSelector([getSelector], (selector) => selector.error);
