import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';

import { fetchChannelDetails } from '../model/thunks/fetch-channel-details';
import { Channel } from './ui';
import { getChannelSubscriberCountSelector, getChannelTitleSelector } from '../model/selectors';

interface Props {
   channelId: string;
}

export const ChannelContainer: FC<Props> = ({ channelId }) => {
   const title = useAppSelector(getChannelTitleSelector);
   const subscriberCount = useAppSelector(getChannelSubscriberCountSelector);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchChannelDetails(channelId));
   }, [channelId]);

   return <Channel title={title} subscriberCount={subscriberCount} />;
};
