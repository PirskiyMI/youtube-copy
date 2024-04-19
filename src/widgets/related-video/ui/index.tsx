import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'src/shared/lib/hooks';
import { VideoPreviewShort, isVideoIdString } from 'src/entities/video';

import styles from './styles.module.scss';
import { relatedVideoActions } from '../model/reducer';
import { getRelatedVideoDataSelector } from '../model/selectors';
import { fetchRelatedVideo } from '../api/fetch-related-video';

export const RelatedVideoList = memo(({ videoId }: { videoId: string }) => {
   const { clearVideoList } = relatedVideoActions;
   const { videoList, loading } = useAppSelector(getRelatedVideoDataSelector);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchRelatedVideo(videoId));
      return () => {
         dispatch(clearVideoList());
      };
   }, []);

   if (loading) {
      return <div>...Loading</div>;
   }

   return (
      <ul className={styles.list}>
         {videoList.map((el) => (
            <li key={isVideoIdString(el.id) ? el.id : el.id.videoId} className={styles.list__item}>
               <Link to={`/watch/${videoId}`}>
                  <VideoPreviewShort {...el} />
               </Link>
            </li>
         ))}
      </ul>
   );
});
