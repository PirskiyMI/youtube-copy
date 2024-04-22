import { createSelector } from '@reduxjs/toolkit';

const getSelector = (state: RootState) => state.videoBySearch;

export const getVideoListBySearchSelector = createSelector(
   [getSelector],
   (selector) => selector.videoList,
);

export const getVideoBySearchLoadingSelector = createSelector(
   [getSelector],
   (selector) => selector.loading,
);

export const getVideoBySearchErrorSelector = createSelector(
   [getSelector],
   (selector) => selector.error,
);
