import { createSelector } from '@reduxjs/toolkit';

const getFavoriteVideoSelector = (state: RootState) => state.favoriteVideos;

export const getFavoriteVideoListSelector = createSelector(
   [getFavoriteVideoSelector],
   (favoriteVideos) => favoriteVideos.data?.videoList,
);

export const getFavoriteVideoLoading = createSelector(
   [getFavoriteVideoSelector],
   (favoriteVideos) => favoriteVideos.loading,
);

export const getFavoriteVideoError = createSelector(
   [getFavoriteVideoSelector],
   (favoriteVideos) => favoriteVideos.error,
);
