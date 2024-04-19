import { FC, Suspense, lazy, useEffect, useState } from 'react';

import { getCount, useAppDispatch, useAppSelector } from 'src/shared';
import { getVideoRating, getVideoRatingSelector } from 'src/entities/video';
import { Channel, fetchSubscriptionStatus, getSubscriptionStatus } from 'src/entities/channel';
import { VideoInfo } from 'src/entities/video-info';

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

import styles from './styles.module.scss';
import { getVideoInfo } from '../api/get-video-info';
import { RateVideo } from 'src/features/rate-video';
import { getIsAuth } from 'src/entities/user';
import { LogIn } from 'src/features/auth/log-in';

interface IProps {
   id: string;
}

export const VideoDescription: FC<IProps> = ({ id }) => {
   const [snippet, setSnippet] = useState<{
      title: string;
      description: string;
      channelId: string;
      publishedAt: string;
   }>();
   const [statistics, setStatistics] = useState<{
      likeCount: string;
      viewCount: string;
   }>();
   const subscribeStatus = useAppSelector(getSubscriptionStatus);
   const videoRating = useAppSelector(getVideoRatingSelector);
   const isAuth = useAppSelector(getIsAuth);
   const dispatch = useAppDispatch();

   useEffect(() => {
      const fetchVideoInfo = async () => {
         try {
            const { snippet, statistics } = await getVideoInfo(id);
            setSnippet(snippet);
            setStatistics(statistics);
         } catch (e) {
            console.log(e);
         }
      };
      dispatch(getVideoRating(id));
      fetchVideoInfo();
   }, [id]);

   useEffect(() => {
      if (snippet?.channelId) dispatch(fetchSubscriptionStatus(snippet.channelId));
   }, [snippet?.channelId]);

   if (!statistics || !snippet) return null;

   const likeCount = getCount(statistics.likeCount);

   return (
      <div className={styles.description}>
         <div className={styles.description__header}>
            <h3 className={styles.description__title}>{snippet.title}</h3>
         </div>
         <div className={styles.description__main}>
            {snippet.channelId && <Channel channelId={snippet.channelId} />}
            <div className={styles.description__controls}>
               <RateVideo videoId={id} likeCount={likeCount} rate={videoRating} />

               <Suspense>
                  {isAuth ? (
                     subscribeStatus ? (
                        <RemoveSubscribe subscribeStatus={subscribeStatus} />
                     ) : (
                        <AddSubscribe channelId={snippet.channelId} />
                     )
                  ) : (
                     <AddSubscribeUnauthorized authButton={<LogIn />} />
                  )}
               </Suspense>
            </div>
         </div>
         <div className={styles.description__footer}>
            <VideoInfo
               viewCount={statistics.viewCount}
               publishedAt={snippet.publishedAt}
               text={snippet.description}
            />
         </div>
      </div>
   );
};
