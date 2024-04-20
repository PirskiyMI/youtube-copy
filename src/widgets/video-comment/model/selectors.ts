import { createSelector } from '@reduxjs/toolkit';

const getSelector = (state: RootState) => state.videoComment;

export const getVideoCommentListSelector = createSelector(
   [getSelector],
   (selector) => selector.data.commentList,
);

export const getVideoCommentNextPageTokenSelector = createSelector(
   [getSelector],
   (selector) => selector.data.nextPageToken,
);

export const getVideoCommentLoadingSelector = createSelector(
   [getSelector],
   (selector) => selector.loading,
);

export const getVideoCommentErrorSelector = createSelector(
   [getSelector],
   (selector) => selector.error,
);
