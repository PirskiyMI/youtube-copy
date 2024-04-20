import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { VideoPreview } from 'src/entities/video/video-preview';

import styles from './styles.module.scss';
import { getPopularVideoListSelector } from '../model/selectors';
import { fetchPopularVideo } from '../model/thunks';

export const PopularVideoList = () => {
   const videoList = useAppSelector(getPopularVideoListSelector);
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
         <ul className={styles.clips__list}>
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
         </ul>
      </section>
   );
};
