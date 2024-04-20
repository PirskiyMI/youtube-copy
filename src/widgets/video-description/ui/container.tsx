import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { fetchSubscriptionStatus, getSubscriptionStatus } from 'src/entities/channel';
import { getVideoRating, getVideoRatingSelector } from 'src/entities/video/video-rating';
import { videoPlayerActions } from 'src/entities/video/video-player';
import { getIsAuth } from 'src/entities/user';

import { VideoDescription } from './ui';
import { getVideoDetailsSelector } from '../model/selectors';
import { fetchVideoDetails } from '../model/thunks';

interface Props {
   videoId: string;
}

export const VideoDescriptionContainer: FC<Props> = ({ videoId }) => {
   const details = useAppSelector(getVideoDetailsSelector);
   const subscribeStatus = useAppSelector(getSubscriptionStatus);
   const videoRating = useAppSelector(getVideoRatingSelector);
   const isAuth = useAppSelector(getIsAuth);
   const { setVideoTitle } = videoPlayerActions;
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchVideoDetails(videoId));
   }, [dispatch, videoId]);

   useEffect(() => {
      if (isAuth) dispatch(getVideoRating(videoId));
   }, [dispatch, videoId, isAuth]);

   useEffect(() => {
      if (details?.channelId && isAuth) dispatch(fetchSubscriptionStatus(details?.channelId));
   }, [details?.channelId, dispatch, isAuth]);

   useEffect(() => {
      if (details?.title) dispatch(setVideoTitle(details?.title));
      return () => {
         dispatch(setVideoTitle(''));
      };
   }, [details?.title, dispatch, setVideoTitle]);

   if (!details) return <></>;

   return (
      <VideoDescription
         details={details}
         isAuth={isAuth}
         subscribeStatus={subscribeStatus}
         videoId={videoId}
         videoRating={videoRating}
      />
   );
};
