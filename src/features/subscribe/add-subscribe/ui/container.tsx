import { FC } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { createSubscription, getChannelLoadingSelector } from 'src/entities/channel';

import { AddSubscribe } from './ui';

interface Props {
   channelId: string;
}

export const AddSubscribeContainer: FC<Props> = ({ channelId }) => {
   const disabled = useAppSelector(getChannelLoadingSelector);
   const dispatch = useAppDispatch();

   const handleCreateSubscription = () => {
      dispatch(createSubscription(channelId));
   };

   return <AddSubscribe handleCreateSubscription={handleCreateSubscription} disabled={disabled} />;
};
