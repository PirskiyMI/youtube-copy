import { createSelector } from '@reduxjs/toolkit';

const getSelector = (state: RootState) => state.videoDescription;

export const getVideoDetailsSelector = createSelector(
   [getSelector],
   (selector) => selector.details,
);

export const getVideoDetailsLoadingSelector = createSelector(
   [getSelector],
   (selector) => selector.loading,
);

export const getVideoDetailsErrorSelector = createSelector(
   [getSelector],
   (selector) => selector.error,
);
