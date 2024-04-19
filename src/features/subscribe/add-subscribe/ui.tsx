import { FC } from 'react';

import { useAppDispatch } from 'src/shared/lib/hooks';
import { Button } from 'src/shared/ui/button';
import { createSubscription, fetchSubscriptionStatus } from 'src/entities/channel';

interface Props {
   channelId: string;
}

export const AddSubscribe: FC<Props> = ({ channelId }) => {
   const dispatch = useAppDispatch();
   const handleCreateSubscription = () => {
      dispatch(createSubscription(channelId));
      setTimeout(() => {
         dispatch(fetchSubscriptionStatus(channelId));
      }, 500);
   };

   return <Button onClick={handleCreateSubscription}>Подписаться</Button>;
};
