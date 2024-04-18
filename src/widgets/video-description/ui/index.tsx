import { FC, useEffect, useState } from 'react';

import { getCount, useAppDispatch, useAppSelector } from 'src/shared';
import { getVideoRating, getVideoRatingSelector } from 'src/entities/video';
import { Channel, fetchSubscriptionStatus, getSubscriptionStatus } from 'src/entities/channel';
import { VideoInfo } from 'src/entities/video-info';
import { RemoveSubscribe } from 'src/features/subscribe/remove-subscribe';
import { AddSubscribe } from 'src/features/subscribe/add-subscribe';

import styles from './styles.module.scss';
import { getVideoInfo } from '../api/get-video-info';
import { RateVideo } from 'src/features/rate-video';

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
               {subscribeStatus ? (
                  <RemoveSubscribe subscribeStatus={subscribeStatus} />
               ) : (
                  <AddSubscribe channelId={snippet.channelId} />
               )}
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
