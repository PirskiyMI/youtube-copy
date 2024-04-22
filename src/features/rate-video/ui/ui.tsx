import { FC } from 'react';

import { getCount } from 'src/shared/lib/helpers';
import { rate } from 'src/shared/lib/types';
import { LikeCounter } from 'src/shared/ui/like-counter';

type onButtonClick = () => void;

interface Props {
   rate: rate;
   likeCount: string;
   onLikeClick: onButtonClick;
   onDislikeClick: onButtonClick;
}

export const RateVideo: FC<Props> = ({ rate, likeCount, onLikeClick, onDislikeClick }) => {
   const formattedLikeCount = getCount(likeCount);

   return (
      <LikeCounter
         rate={rate}
         likeCount={formattedLikeCount}
         onLikeClick={onLikeClick}
         onDislikeClick={onDislikeClick}
      />
   );
};
