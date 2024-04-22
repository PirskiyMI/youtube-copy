import { FC } from 'react';

import { Skeleton } from 'src/shared/ui/skeleton';

import styles from './styles.module.scss';

export const ChannelSkeleton: FC = () => {
   return (
      <div className={styles.skeleton}>
         <Skeleton className={styles.skeleton__avatar} />
         <div className={styles.skeleton__body}>
            <Skeleton className={styles.skeleton__item} />
            <Skeleton className={`${styles.skeleton__item} ${styles.skeleton__item_short}`} />
         </div>
      </div>
   );
};
