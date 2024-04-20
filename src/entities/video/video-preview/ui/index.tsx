import { FC } from 'react';

import { Avatar } from 'src/shared/ui/avatar';

import styles from './styles.module.scss';
import { VideoPreviewProps } from '../types';

export const VideoPreview: FC<VideoPreviewProps> = ({
   channelTitle,
   title,
   publishedAt,
   thumbnail,
   duration,
   viewCount,
   viewNoun,
}) => {
   return (
      <article className={styles.clip}>
         <div className={styles.clip__image}>
            <img src={thumbnail.url} alt="Превью" className={styles.clip__preview} />
            <span className={styles.clip__duration}>{duration}</span>
         </div>
         <div className={styles.clip__description}>
            <Avatar />
            <div className={styles.clip__content}>
               <h3 className={styles.clip__title}>{title}</h3>
               <div className={styles.clip__text}>
                  <p>{channelTitle}</p>
                  <p className={styles.clip__metrics}>
                     <span>
                        {viewCount} {viewNoun}
                     </span>
                     <span className={styles.clip__date}>{publishedAt}</span>
                  </p>
               </div>
            </div>
         </div>
      </article>
   );
};
