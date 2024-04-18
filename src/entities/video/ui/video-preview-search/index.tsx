import { FC } from 'react';

import { IVideo } from '../../lib/types';
import { useFetchVideoDetails } from '../../lib/hooks/use-fetch-video-details';
import { isVideoIdString } from '../../lib/helpers';
import { useVideoDetails } from '../../lib/hooks/use-video-details';

import styles from './styles.module.scss';
import { Avatar } from 'src/shared';

export const VideoPreviewSearch: FC<IVideo> = ({
   id,
   snippet: {
      channelTitle,
      title,
      publishedAt,
      description,
      thumbnails: { high },
   },
}) => {
   const { data, isFetching } = useFetchVideoDetails({
      id: isVideoIdString(id) ? id : id.videoId,
      isFetching: true,
      publishedAt,
   });

   const details = useVideoDetails({ details: data });

   if (isFetching) {
      return <></>;
   } else if (!details) {
      return null;
   }

   const { formattedDuration, formattedPublishedAt, formattedViewCount, viewNoun } = details;

   return (
      <article className={styles.clip}>
         <div className={styles.clip__image}>
            <img src={high.url} alt="Превью" className={styles.clip__preview} />
            <span className={styles.clip__duration}>{formattedDuration}</span>
         </div>
         <div className={styles.clip__description}>
            <h3 className={styles.clip__title} title={title}>
               {title}
            </h3>
            <div className={styles.clip__text}>
               <p className={styles.clip__metrics}>
                  <span>
                     {formattedViewCount} {viewNoun}
                  </span>
                  <span className={styles.clip__date}>{formattedPublishedAt}</span>
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
