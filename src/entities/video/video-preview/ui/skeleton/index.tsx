import { Skeleton } from 'src/shared/ui/skeleton';
import styles from './styles.module.scss';

export const VideoPreviewSkeleton = () => {
   return (
      <div className={styles.skeleton}>
         <Skeleton className={styles.skeleton__image} />
         <div className={styles.skeleton__content}>
            <Skeleton className={styles.skeleton__avatar} />
            <div className={styles.skeleton__text}>
               <Skeleton className={styles.skeleton__item} />
               <Skeleton className={`${styles.skeleton__item} ${styles.skeleton__item_short}`} />
            </div>
         </div>
      </div>
   );
};
