import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { Preloader } from 'src/shared/ui/preloader';
import { VideoPreview } from 'src/entities/video/video-preview';
import { VideoPreviewList } from 'src/entities/video/video-preview-list';

import styles from './styles.module.scss';
import { getPopularVideoListSelector, getPopularVideoLoading } from '../model/selectors';
import { fetchPopularVideo } from '../model/thunks';

export const PopularVideoList = () => {
   const videoList = useAppSelector(getPopularVideoListSelector);
   const loading = useAppSelector(getPopularVideoLoading);
   const { ref, inView } = useInView();
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchPopularVideo({ maxResults: 20 }));
   }, []);

   useEffect(() => {
      if (inView && videoList.length < 50) {
         dispatch(fetchPopularVideo({ maxResults: 10 }));
      }
   }, [inView]);

   return (
      <section className={styles.clips}>
         <VideoPreviewList>
            {videoList.map((el, index, array) => (
               <li
                  ref={index === array.length - 1 ? ref : null}
                  key={el.id}
                  className={styles.clips__item}>
                  <Link to={`/watch/${el.id}`}>
                     <VideoPreview {...el} />
                  </Link>
               </li>
            ))}
         </VideoPreviewList>
         {loading && (
            <div className={styles.clips__preloader}>
               <Preloader />
            </div>
         )}
      </section>
   );
};
