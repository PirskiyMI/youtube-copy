import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { Preloader } from 'src/shared/ui/preloader';
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { VideoPreview } from 'src/entities/video/video-preview';
import { VideoPreviewList } from 'src/entities/video/video-preview-list';

import {
   getFavoriteVideoError,
   getFavoriteVideoListSelector,
   getFavoriteVideoLoading,
} from '../model/selectors';
import { fetchFavoriteVideo } from '../model/thunks';
import { favoriteVideosActions } from '../model/slice';
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
      return <Preloader />;
   }

   return (
      <section className={styles.clips}>
         <VideoPreviewList>
            {videoList.map((el, index, array) => (
               <li ref={index === array.length - 1 ? ref : null} key={el.id}>
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
