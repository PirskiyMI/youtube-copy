import { FC } from 'react';

import { useAppDispatch } from 'src/shared/lib/hooks';
import { channelActions, deleteSubscription } from 'src/entities/channel';

import { RemoveSubscribe } from './ui';

interface Props {
   subscribeStatus: string;
}

export const RemoveSubscribeContainer: FC<Props> = ({ subscribeStatus }) => {
   const { clearSubscriptionStatus } = channelActions;
   const dispatch = useAppDispatch();
   const handleDeleteSubscription = () => {
      dispatch(deleteSubscription(subscribeStatus));
      dispatch(clearSubscriptionStatus());
   };

   return <RemoveSubscribe handleDeleteSubscription={handleDeleteSubscription} />;
};
