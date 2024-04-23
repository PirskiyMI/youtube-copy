import { FC, Suspense } from 'react';

import { rate } from 'src/shared/lib/types';
import { formatVideoDetails } from 'src/entities/video/video-details';
import { Channel } from 'src/entities/channel';
import { VideoInfo } from 'src/entities/video/video-info';
import { Login } from 'src/features/auth/login';
import { RateVideo } from 'src/features/rate-video';
import { RateVideoUnauthorized } from 'src/features/rate-video-unauthorized';
import { RemoveSubscribe } from 'src/features/subscribe/remove-subscribe';
import { AddSubscribe } from 'src/features/subscribe/add-subscribe';
import { AddSubscribeUnauthorized } from 'src/features/subscribe/add-subscribe-unauthorized';

import { VideoDetails } from '../model/slice';

import styles from './styles.module.scss';
import { ControlsSkeleton } from './controls-skeleton';
import { RatingSkeleton } from './rating-skeleton';

interface Props {
   videoId: string;
   isAuth: boolean;
   subscribeStatus: string;
   videoRating: rate;
   details: VideoDetails;
}

export const VideoDescription: FC<Props> = ({
   videoId,
   isAuth,
   subscribeStatus,
   videoRating,
   details: { channelId, title, description, likeCount, viewCount, publishedAt },
}) => {
   return (
      <div className={styles.description}>
         <div className={styles.description__header}>
            <h3 className={styles.description__title}>{title}</h3>
         </div>
         <div className={styles.description__main}>
            <Channel channelId={channelId} />
            <div className={styles.description__controls}>
               <Suspense fallback={<RatingSkeleton />}>
                  {isAuth ? (
                     <RateVideo videoId={videoId} likeCount={likeCount} rate={videoRating} />
                  ) : (
                     <RateVideoUnauthorized likeCount={likeCount} authButton={<Login />} />
                  )}
               </Suspense>
               <Suspense fallback={<ControlsSkeleton />}>
                  {isAuth ? (
                     subscribeStatus ? (
                        <RemoveSubscribe subscribeStatus={subscribeStatus} />
                     ) : (
                        <AddSubscribe channelId={channelId} />
                     )
                  ) : (
                     <AddSubscribeUnauthorized authButton={<Login />} />
                  )}
               </Suspense>
            </div>
         </div>
         <div className={styles.description__footer}>
            <VideoInfo
               description={description}
               {...formatVideoDetails({ publishedAt, viewCount })}
            />
         </div>
      </div>
   );
};
