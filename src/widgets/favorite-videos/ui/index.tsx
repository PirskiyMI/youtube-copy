import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { useAppDispatch, useAppSelector } from 'src/shared';
import { VideoPreview, VideoPreviewSkeleton, isVideoIdString } from 'src/entities/video';

import {
   getFavoriteVideoError,
   getFavoriteVideoListSelector,
   getFavoriteVideoLoading,
} from '../model/selectors';
import { fetchFavoriteVideo } from '../api/fetch-favorite-video';
import { favoriteVideosActions } from '../model/reducers';
import styles from './styles.module.scss';

export const FavoriteVideoList = () => {
   const videoList = useAppSelector(getFavoriteVideoListSelector);
   const error = useAppSelector(getFavoriteVideoError);
   const loading = useAppSelector(getFavoriteVideoLoading);
   const { resetState } = favoriteVideosActions;
   const { ref, inView } = useInView();
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchFavoriteVideo());
      return () => {
         dispatch(resetState());
      };
   }, []);

   useEffect(() => {
      if (videoList)
         if (inView && videoList.length < 80) {
            dispatch(fetchFavoriteVideo());
         }
   }, [inView]);

   if (error) {
      return <div>Не удается загрузить список понравившихся видео</div>;
   }
   if (!videoList) {
      return (
         <div className={styles.clips}>
            <ul className={styles.clips__list}>
               {loading &&
                  [...new Array(4)].map((_, index) => (
                     <li key={index} className={styles.clips__item}>
                        <VideoPreviewSkeleton />
                     </li>
                  ))}
            </ul>
         </div>
      );
   }

   return (
      <section className={styles.clips}>
         <ul className={styles.clips__list}>
            {videoList.map((el, index, array) => (
               <li
                  ref={index === array.length - 1 ? ref : null}
                  key={isVideoIdString(el.id) ? el.id : el.id?.videoId}
                  className={styles.clips__item}>
                  <Link to={`/watch/${isVideoIdString(el.id) ? el.id : el.id?.videoId}`}>
                     <VideoPreview {...el} />
                  </Link>
               </li>
            ))}
            {loading &&
               [...new Array(4)].map((_, index) => (
                  <li key={index} className={styles.clips__item}>
                     <VideoPreviewSkeleton />
                  </li>
               ))}
         </ul>
      </section>
   );
};
