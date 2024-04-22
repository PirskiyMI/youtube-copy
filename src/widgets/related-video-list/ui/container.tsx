import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { getVideoTitleSelector } from 'src/entities/video/video-player';

import { relatedVideoActions } from '../model/slice';
import { getRelatedVideoDataSelector } from '../model/selectors';
import { fetchRelatedVideo } from '../model/thunks';
import { RelatedVideoList } from './ui';

export const RelatedVideoListContainer: FC = () => {
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
      return <></>;
   }

   return <RelatedVideoList videoList={videoList} />;
};
