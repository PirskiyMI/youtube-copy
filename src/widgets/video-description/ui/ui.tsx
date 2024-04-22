import { FC, Suspense, lazy } from 'react';

import { formatVideoDetails } from 'src/entities/video/video-details';
import { Channel } from 'src/entities/channel';
import { VideoInfo } from 'src/entities/video/video-info';
import { Login } from 'src/features/auth/login';

const RemoveSubscribe = lazy(async () => {
   const { RemoveSubscribe } = await import('src/features/subscribe/remove-subscribe');
   return { default: RemoveSubscribe };
});
const AddSubscribe = lazy(async () => {
   const { AddSubscribe } = await import('src/features/subscribe/add-subscribe');
   return { default: AddSubscribe };
});
const AddSubscribeUnauthorized = lazy(async () => {
   const { AddSubscribeUnauthorized } = await import(
      'src/features/subscribe/add-subscribe-unauthorized'
   );
   return { default: AddSubscribeUnauthorized };
});
const RateVideo = lazy(async () => {
   const { RateVideo } = await import('src/features/rate-video');
   return { default: RateVideo };
});
const RateVideoUnauthorized = lazy(async () => {
   const { RateVideoUnauthorized } = await import('src/features/rate-video-unauthorized');
   return { default: RateVideoUnauthorized };
});

import styles from './styles.module.scss';
import { VideoDetails } from '../model/slice';

interface IProps {
   videoId: string;
   isAuth: boolean;
   subscribeStatus: string;
   videoRating: 'like' | 'dislike' | 'none' | 'unspecified';
   details: VideoDetails;
}

export const VideoDescription: FC<IProps> = ({
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
               <Suspense>
                  {isAuth ? (
                     <RateVideo videoId={videoId} likeCount={likeCount} rate={videoRating} />
                  ) : (
                     <RateVideoUnauthorized likeCount={likeCount} authButton={<Login />} />
                  )}
               </Suspense>
               <Suspense>
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
