import { FC } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { createSubscription, getSubscriptionStatusLoadingSelector } from 'src/entities/channel';

import { AddSubscribe } from './ui';

interface Props {
   channelId: string;
}

export const AddSubscribeContainer: FC<Props> = ({ channelId }) => {
   const disabled = useAppSelector(getSubscriptionStatusLoadingSelector);
   const dispatch = useAppDispatch();

   const handleCreateSubscription = () => {
      dispatch(createSubscription(channelId));
   };

   return <AddSubscribe handleCreateSubscription={handleCreateSubscription} disabled={disabled} />;
};
