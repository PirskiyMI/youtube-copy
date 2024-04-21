import { combineReducers } from '@reduxjs/toolkit';

import { channelReducer } from 'src/entities/channel';
import { userReducer } from 'src/entities/user';
import { videoPlayerReducer } from 'src/entities/video/video-player';
import { popularVideoReducer } from 'src/widgets/popular-video-list';
import { relatedVideoReducer } from 'src/widgets/related-video';
import { videoCommentReducer } from 'src/widgets/video-comment';
import { videosBySearchReducer } from 'src/widgets/video-by-search';
import { favoriteVideosReducer } from 'src/widgets/favorite-videos';
import { videoDescriptionReducer } from 'src/widgets/video-description';
import { videoRatingReducer } from 'src/entities/video/video-rating';

export const rootReducer = combineReducers({
   user: userReducer,
   channel: channelReducer,
   relatedVideo: relatedVideoReducer,
   popularVideo: popularVideoReducer,
   favoriteVideos: favoriteVideosReducer,
   videoPlayer: videoPlayerReducer,
   videoRating: videoRatingReducer,
   videoBySearch: videosBySearchReducer,
   videoComment: videoCommentReducer,
   videoDescription: videoDescriptionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
