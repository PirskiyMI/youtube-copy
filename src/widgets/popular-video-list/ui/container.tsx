import { FC, useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';

import { PopularVideoList } from './ui';
import { fetchPopularVideo } from '../model/thunks';
import { getPopularVideoListSelector, getPopularVideoLoading } from '../model/selectors';
import { VideoPreviewList } from 'src/entities/video/video-preview-list';
import { VideoPreviewSkeleton } from 'src/entities/video/video-preview';

export const PopularVideoListContainer: FC = () => {
   const [inView, setInView] = useState(false);
   const videoList = useAppSelector(getPopularVideoListSelector);
   const loading = useAppSelector(getPopularVideoLoading);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchPopularVideo({ maxResults: 10 }));
   }, []);

   useEffect(() => {
      if (inView && videoList.length < 50) {
         dispatch(fetchPopularVideo({ maxResults: 10 }));
      }
   }, [inView]);

   const handleInView = useCallback((inView: boolean) => {
      setInView(inView);
   }, []);

   if (!videoList.length)
      return (
         <VideoPreviewList>
            {[...new Array(16)].map((_, index) => (
               <li key={index}>
                  <VideoPreviewSkeleton />
               </li>
            ))}
         </VideoPreviewList>
      );

   return <PopularVideoList videoList={videoList} loading={loading} handleInView={handleInView} />;
};
