import { FC } from 'react';

import { useAppDispatch } from 'src/shared/lib/hooks';
import { setVideoRating } from 'src/entities/video';

import { LikeCounter } from 'src/shared/ui/like-counter';

interface Props {
   videoId: string;
   likeCount: string;
   rate: 'like' | 'dislike' | 'none' | 'unspecified';
}

export const RateVideo: FC<Props> = ({ videoId, likeCount, rate }) => {
   const dispatch = useAppDispatch();

   const setLikeVideo = () => dispatch(setVideoRating({ videoId, rate: 'like' }));
   const setDislikeVideo = () => dispatch(setVideoRating({ videoId, rate: 'dislike' }));
   const deleteRateVideo = () => dispatch(setVideoRating({ videoId, rate: 'none' }));

   return (
      <LikeCounter
         rate={rate}
         likeCount={likeCount}
         onLikeClick={rate === 'like' ? deleteRateVideo : setLikeVideo}
         onDislikeClick={rate === 'dislike' ? deleteRateVideo : setDislikeVideo}
      />
   );
};
