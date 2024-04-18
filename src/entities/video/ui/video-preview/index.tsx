import { FC } from 'react';

import { Avatar } from 'src/shared';

import { IVideo, isVideoIdString } from '../..';
import { useFetchVideoDetails } from '../../lib/hooks/use-fetch-video-details';
import { useVideoDetails } from '../../lib/hooks/use-video-details';
import { VideoPreviewSkeleton } from './skeleton';
import styles from './styles.module.scss';

export const VideoPreview: FC<IVideo> = ({
   id,
   snippet: {
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
   },
   contentDetails,
   statistics,
}) => {
   const { data, isFetching } = useFetchVideoDetails({
      id: isVideoIdString(id) ? id : id.videoId,
      isFetching: true,
      publishedAt,
      contentDetails,
      statistics,
   });
   const details = useVideoDetails({ details: data });

   if (isFetching) {
      return <VideoPreviewSkeleton />;
   } else if (!details) {
      return null;
   }

   const { formattedDuration, formattedPublishedAt, formattedViewCount, viewNoun } = details;

   return (
      <article className={styles.clip}>
         <div className={styles.clip__image}>
            <img src={medium.url} alt="Превью" className={styles.clip__preview} />
            <span className={styles.clip__duration}>{formattedDuration}</span>
         </div>
         <div className={styles.clip__description}>
            <Avatar />
            <div className={styles.clip__content}>
               <h3 className={styles.clip__title}>{title}</h3>
               <div className={styles.clip__text}>
                  <p>{channelTitle}</p>
                  <p className={styles.clip__metrics}>
                     <span>
                        {formattedViewCount} {viewNoun}
                     </span>
                     <span className={styles.clip__date}>{formattedPublishedAt}</span>
                  </p>
               </div>
            </div>
         </div>
      </article>
   );
};
