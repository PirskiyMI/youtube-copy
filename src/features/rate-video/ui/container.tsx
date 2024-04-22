import { FC } from 'react';

import { useAppDispatch } from 'src/shared/lib/hooks';
import { rate } from 'src/shared/lib/types';
import { setVideoRating } from 'src/entities/video/video-rating';

import { RateVideo } from './ui';

interface Props {
   videoId: string;
   likeCount: string;
   rate: rate;
}

export const RateVideoContainer: FC<Props> = ({ videoId, rate, ...props }) => {
   const dispatch = useAppDispatch();

   const setLikeVideo = () => dispatch(setVideoRating({ videoId, rate: 'like' }));
   const setDislikeVideo = () => dispatch(setVideoRating({ videoId, rate: 'dislike' }));
   const deleteRateVideo = () => dispatch(setVideoRating({ videoId, rate: 'none' }));

   const onLikeClick = rate !== 'like' ? setLikeVideo : deleteRateVideo;
   const onDislikeClick = rate !== 'dislike' ? setDislikeVideo : deleteRateVideo;

   return (
      <RateVideo rate={rate} onLikeClick={onLikeClick} onDislikeClick={onDislikeClick} {...props} />
   );
};
