import styles from './styles.module.scss';

export const VideoPreviewShortSkeleton = () => {
   return (
      <div className={styles.skeleton}>
         <div className={styles.skeleton__preview} />
         <div className={styles.skeleton__content}>
            <div className={styles.skeleton__item} />
            <div className={styles.skeleton__item} />
            <div className={styles.skeleton__item} />
         </div>
      </div>
   );
};
