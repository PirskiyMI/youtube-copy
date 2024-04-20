import { FC, Suspense, lazy, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { videoPlayerActions } from 'src/entities/video/video-player';
import { formatVideoDetails } from 'src/entities/video/video-details';
import { getVideoRating, getVideoRatingSelector } from 'src/entities/video/video-rating';
import { Channel, fetchSubscriptionStatus, getSubscriptionStatus } from 'src/entities/channel';
import { VideoInfo } from 'src/entities/video/video-info';
import { getIsAuth } from 'src/entities/user';
import { LogIn } from 'src/features/auth/log-in';

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

import { fetchVideoDetails } from '../model/thunks';
import { getVideoDetailsSelector } from '../model/selectors';

interface IProps {
   id: string;
}

export const VideoDescription: FC<IProps> = ({ id }) => {
   const details = useAppSelector(getVideoDetailsSelector);
   const subscribeStatus = useAppSelector(getSubscriptionStatus);
   const videoRating = useAppSelector(getVideoRatingSelector);
   const isAuth = useAppSelector(getIsAuth);
   const { setVideoTitle } = videoPlayerActions;
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchVideoDetails(id));
   }, [dispatch, id]);

   useEffect(() => {
      if (isAuth) dispatch(getVideoRating(id));
   }, [dispatch, id, isAuth]);

   useEffect(() => {
      if (details?.channelId && isAuth) dispatch(fetchSubscriptionStatus(details?.channelId));
   }, [details?.channelId, dispatch, isAuth]);

   useEffect(() => {
      if (details?.title) dispatch(setVideoTitle(details?.title));
      return () => {
         dispatch(setVideoTitle(''));
      };
   }, [details?.title, dispatch, setVideoTitle]);

   if (!details) {
      return <></>;
   }

   const { channelId, title, description, likeCount, viewCount, publishedAt } = details;

   return (
      <div className={styles.description}>
         <div className={styles.description__header}>
            <h3 className={styles.description__title}>{title}</h3>
         </div>
         <div className={styles.description__main}>
            {channelId && <Channel channelId={channelId} />}
            <div className={styles.description__controls}>
               <Suspense>
                  {isAuth ? (
                     <RateVideo videoId={id} likeCount={likeCount} rate={videoRating} />
                  ) : (
                     <RateVideoUnauthorized likeCount={likeCount} authButton={<LogIn />} />
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
                     <AddSubscribeUnauthorized authButton={<LogIn />} />
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
