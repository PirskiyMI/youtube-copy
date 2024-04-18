import { FC } from 'react';
import { createSubscription, fetchSubscriptionStatus } from 'src/entities/channel';
import { Button, useAppDispatch } from 'src/shared';

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
