import { FC, useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { VideoPreviewList } from 'src/entities/video/video-preview-list';
import { VideoPreviewSkeleton } from 'src/entities/video/video-preview';

import {
   getFavoriteVideoListSelector,
   getFavoriteVideoErrorSelector,
   getFavoriteVideoLoadingSelector,
} from '../model/selectors';
import { favoriteVideoActions } from '../model/slice';
import { fetchFavoriteVideo } from '../model/thunks';
import { FavoriteVideoList } from './ui';

export const FavoriteVideoListContainer: FC = () => {
   const loading = useAppSelector(getFavoriteVideoLoadingSelector);
   const videoList = useAppSelector(getFavoriteVideoListSelector);
   const error = useAppSelector(getFavoriteVideoErrorSelector);
   const [inView, setInView] = useState(false);
   const { resetState } = favoriteVideoActions;
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchFavoriteVideo());
      return () => {
         dispatch(resetState());
      };
   }, [dispatch, resetState]);

   useEffect(() => {
      if (inView && videoList.length < 100) dispatch(fetchFavoriteVideo());
      setInView(false);
   }, [dispatch, inView]);

   const handleInView = useCallback((inView: boolean) => {
      setInView(inView);
   }, []);

   if (error) {
      return <div>Не удается загрузить список понравившихся видео</div>;
   }
   if (!videoList.length) {
      return (
         <VideoPreviewList>
            {[...new Array(16)].map((_, index) => (
               <li key={index}>
                  <VideoPreviewSkeleton />
               </li>
            ))}
         </VideoPreviewList>
      );
   }

   return <FavoriteVideoList loading={loading} videoList={videoList} handelInView={handleInView} />;
};
