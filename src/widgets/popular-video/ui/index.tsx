import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { VideoPreview, isVideoIdString } from 'src/entities/video';

import styles from './styles.module.scss';
import { getPopularVideoDataSelector } from '../model/selectors';
import { fetchPopularVideo } from '../api/fetch-popular-video';

export const PopularVideoList = () => {
   const { nextPageToken, videoList } = useAppSelector(getPopularVideoDataSelector);
   const { ref, inView } = useInView();
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchPopularVideo({ token: nextPageToken, maxResult: 20 }));
   }, []);

   useEffect(() => {
      if (inView && videoList.length < 50) {
         dispatch(fetchPopularVideo({ token: nextPageToken, maxResult: 10 }));
      }
   }, [inView]);

   return (
      <section className={styles.clips}>
         <ul className={styles.clips__list}>
            {videoList.map((el, index, array) => {
               if (index === array.length - 1) {
                  return (
                     <li
                        ref={ref}
                        key={isVideoIdString(el.id) ? el.id : el.id?.videoId}
                        className={styles.clips__item}>
                        <Link to={`/watch/${isVideoIdString(el.id) ? el.id : el.id?.videoId}`}>
                           <VideoPreview {...el} />
                        </Link>
                     </li>
                  );
               } else {
                  return (
                     <li
                        key={isVideoIdString(el.id) ? el.id : el.id?.videoId}
                        className={styles.clips__item}>
                        <Link
                           to={`/watch/${isVideoIdString(el.id) ? el.id : el.id?.videoId}`}
                           style={{ width: '100%' }}>
                           <VideoPreview {...el} />
                        </Link>
                     </li>
                  );
               }
            })}
         </ul>
      </section>
   );
};
