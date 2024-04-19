import { combineReducers } from '@reduxjs/toolkit';
import { channelReducer } from 'src/entities/channel';
import { userReducer } from 'src/entities/user';
import { popularVideoReducer } from 'src/widgets/popular-video';
import { relatedVideoReducer } from 'src/widgets/related-video';
import { videoCommentReducer } from 'src/widgets/video-comment';
import { videoReducer } from 'src/entities/video';
import { videosBySearchReducer } from 'src/widgets/video-by-search';
import { favoriteVideosReducer } from 'src/widgets/favorite-videos';

export const rootReducer = combineReducers({
   user: userReducer,
   channel: channelReducer,
   relatedVideo: relatedVideoReducer,
   popularVideo: popularVideoReducer,
   favoriteVideos: favoriteVideosReducer,
   videoBySearch: videosBySearchReducer,
   videoComment: videoCommentReducer,
   videoRating: videoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
