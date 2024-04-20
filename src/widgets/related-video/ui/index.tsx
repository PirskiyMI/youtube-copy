import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'src/shared/lib/hooks';
import { getVideoTitleSelector } from 'src/entities/video/video-player';
import { VideoPreviewShort } from 'src/entities/video/video-preview-related';

import styles from './styles.module.scss';
import { relatedVideoActions } from '../model/slice';
import { getRelatedVideoDataSelector } from '../model/selectors';
import { fetchRelatedVideo } from '../model/thunks';

export const RelatedVideoList = memo(() => {
   const { clearVideoList } = relatedVideoActions;
   const { videoList, loading } = useAppSelector(getRelatedVideoDataSelector);
   const videoTitle = useAppSelector(getVideoTitleSelector);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (videoTitle) dispatch(fetchRelatedVideo(videoTitle));
      return () => {
         dispatch(clearVideoList());
      };
   }, [videoTitle, dispatch, clearVideoList]);

   if (loading) {
      return <div>...Loading</div>;
   }

   return (
      <ul className={styles.list}>
         {videoList.map((el) => (
            <li key={el.id} className={styles.list__item}>
               <Link to={`/watch/${el.id}`}>
                  <VideoPreviewShort {...el} />
               </Link>
            </li>
         ))}
      </ul>
   );
});
