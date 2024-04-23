import { createSelector } from '@reduxjs/toolkit';

const getSelector = (state: RootState) => state.videoRating;

export const getVideoRatingSelector = createSelector(
   [getSelector],
   (videoRating) => videoRating.rating,
);

export const getVideoRatingLoadingSelector = createSelector(
   [getSelector],
   (videoRating) => videoRating.loading,
);

export const getVideoRatingErrorSelector = createSelector(
   [getSelector],
   (videoRating) => videoRating.error,
);
