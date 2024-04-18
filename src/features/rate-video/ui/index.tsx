import { FC } from 'react';

import { useAppDispatch } from 'src/shared';
import { setVideoRating } from 'src/entities/video';

import styles from './styles.module.scss';
import LikeIcon from './../assets/like.svg?react';
import DislikeIcon from './../assets/dislike.svg?react';

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
      <div className={styles.rate}>
         <button
            className={styles.rate__button}
            onClick={rate !== 'like' ? setLikeVideo : deleteRateVideo}>
            <LikeIcon
               className={
                  styles.rate__icon + (rate === 'like' ? ` ${styles.rate__icon_active}` : '')
               }
            />
            <span>{likeCount}</span>
         </button>
         <button
            className={styles.rate__button}
            onClick={rate !== 'dislike' ? setDislikeVideo : deleteRateVideo}>
            <DislikeIcon
               className={
                  styles.rate__icon + (rate === 'dislike' ? ` ${styles.rate__icon_active}` : '')
               }
            />
         </button>
      </div>
   );
};
