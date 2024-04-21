import { FC } from 'react';

import { Avatar } from 'src/shared/ui/avatar';

import styles from './styles.module.scss';
import { VideoBySearchPreviewProps } from '../types';

export const VideoBySearchPreview: FC<VideoBySearchPreviewProps> = ({
   channelTitle,
   title,
   description,
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
            <h3 className={styles.clip__title} title={title}>
               {title}
            </h3>
            <div className={styles.clip__text}>
               <p className={styles.clip__metrics}>
                  <span>
                     {viewCount} {viewNoun}
                  </span>
                  <span className={styles.clip__date}>{publishedAt}</span>
               </p>
            </div>
            <div className={styles.clip__channel}>
               <Avatar />
               <span>{channelTitle}</span>
            </div>
            <div className={styles.clip__text}>{description}</div>
         </div>
      </article>
   );
};
