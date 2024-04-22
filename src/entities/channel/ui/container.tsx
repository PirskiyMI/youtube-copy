import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';

import { fetchChannelDetails } from '../model/thunks/fetch-channel-details';
import { Channel } from './ui';
import {
   getChannelLoadingSelector,
   getChannelSubscriberCountSelector,
   getChannelTitleSelector,
} from '../model/selectors';
import { ChannelSkeleton } from './skeleton';

interface Props {
   channelId: string;
}

export const ChannelContainer: FC<Props> = ({ channelId }) => {
   const loading = useAppSelector(getChannelLoadingSelector);
   const title = useAppSelector(getChannelTitleSelector);
   const subscriberCount = useAppSelector(getChannelSubscriberCountSelector);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchChannelDetails(channelId));
   }, [channelId]);

   if (loading) {
      <ChannelSkeleton />;
   }

   return <Channel title={title} subscriberCount={subscriberCount} />;
};
