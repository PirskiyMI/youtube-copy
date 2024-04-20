import { FC } from 'react';

import { getNoun } from 'src/shared/lib/helpers';

import styles from './styles.module.scss';
import { VideoPreviewRelatedProps } from '../types';

export const VideoPreviewShort: FC<VideoPreviewRelatedProps> = ({
   channelTitle,
   title,
   publishedAt,
   thumbnail,
   duration,
   viewCount,
}) => {
   const viewNoun = getNoun(+viewCount, 'просмотр', 'просмотра', 'просмотров');

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
               <p>{channelTitle}</p>
               <p className={styles.clip__metrics}>
                  <span>
                     {viewCount} {viewNoun}
                  </span>
                  <span className={styles.clip__date}>{publishedAt}</span>
               </p>
            </div>
         </div>
      </article>
   );
};
