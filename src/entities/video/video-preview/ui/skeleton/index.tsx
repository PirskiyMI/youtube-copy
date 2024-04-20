import styles from './styles.module.scss';

export const VideoPreviewSkeleton = () => {
   return (
      <div className={styles.skeleton}>
         <div className={styles.skeleton__image}></div>
         <div className={styles.skeleton__content}>
            <div className={styles.skeleton__avatar}></div>
            <div className={styles.skeleton__text}>
               <div className={styles.skeleton__item}></div>
               <div className={styles.skeleton__item}></div>
               <div className={styles.skeleton__item}></div>
            </div>
         </div>
      </div>
   );
};
