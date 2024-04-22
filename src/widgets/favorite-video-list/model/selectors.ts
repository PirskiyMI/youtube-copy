import { createSelector } from '@reduxjs/toolkit';

const getFavoriteVideoSelector = (state: RootState) => state.favoriteVideo;

export const getFavoriteVideoListSelector = createSelector(
   [getFavoriteVideoSelector],
   (favoriteVideos) => favoriteVideos.data.videoList,
);

export const getFavoriteVideoLoadingSelector = createSelector(
   [getFavoriteVideoSelector],
   (favoriteVideos) => favoriteVideos.loading,
);

export const getFavoriteVideoErrorSelector = createSelector(
   [getFavoriteVideoSelector],
   (favoriteVideos) => favoriteVideos.error,
);
