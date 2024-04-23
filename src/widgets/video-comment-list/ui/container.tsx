import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { getIsAuth } from 'src/entities/user';

import { VideoCommentList } from './ui';
import { videoCommentActions } from '../model/slice';
import {
   getVideoCommentErrorSelector,
   getVideoCommentListSelector,
   getVideoCommentLoadingSelector,
   getVideoCommentNextPageTokenSelector,
} from '../model/selectors';
import { fetchComment } from '../model/thunks';

interface Props {
   videoId: string;
}

export const VideoCommentListContainer: FC<Props> = ({ videoId }) => {
   const { clearCommentList } = videoCommentActions;
   const isAuth = useAppSelector(getIsAuth);
   const commentList = useAppSelector(getVideoCommentListSelector);
   const nextPageToken = useAppSelector(getVideoCommentNextPageTokenSelector);
   const loading = useAppSelector(getVideoCommentLoadingSelector);
   const error = useAppSelector(getVideoCommentErrorSelector);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchComment({ videoId, token: nextPageToken, maxResults: 40 }));
      return () => {
         dispatch(clearCommentList());
      };
   }, []);

   if (error) return <div>{error}</div>;

   if (loading && !commentList.length) return <></>;

   return (
      <VideoCommentList
         videoId={videoId}
         commentList={commentList}
         nextPageToken={nextPageToken}
         loading={loading}
         isAuth={isAuth}
      />
   );
};
