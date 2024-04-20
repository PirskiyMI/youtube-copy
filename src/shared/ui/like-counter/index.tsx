import { FC } from 'react';

import LikeIcon from '../../lib/assets/images/like.svg?react';
import DislikeIcon from '../../lib/assets/images/dislike.svg?react';

import styles from './styles.module.scss';

interface Props {
   likeCount: string;
   rate: 'like' | 'dislike' | 'none' | 'unspecified';
   onLikeClick: () => void;
   onDislikeClick: () => void;
}

export const LikeCounter: FC<Props> = ({ likeCount, rate, onLikeClick, onDislikeClick }) => {
   return (
      <div className={styles.rate}>
         <button className={styles.rate__button} onClick={onLikeClick}>
            <LikeIcon
               className={
                  styles.rate__icon + (rate === 'like' ? ` ${styles.rate__icon_active}` : '')
               }
            />
            <span>{likeCount}</span>
         </button>
         <button className={styles.rate__button} onClick={onDislikeClick}>
            <DislikeIcon
               className={
                  styles.rate__icon + (rate === 'dislike' ? ` ${styles.rate__icon_active}` : '')
               }
            />
         </button>
      </div>
   );
};
