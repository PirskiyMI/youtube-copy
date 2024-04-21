import { FC } from 'react';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { Button } from 'src/shared/ui/button';
import { createSubscription, getSubscriptionStatusLoadingSelector } from 'src/entities/channel';

interface Props {
   channelId: string;
}

export const AddSubscribe: FC<Props> = ({ channelId }) => {
   const disabled = useAppSelector(getSubscriptionStatusLoadingSelector);
   const dispatch = useAppDispatch();

   const handleCreateSubscription = () => {
      dispatch(createSubscription(channelId));
   };

   return (
      <Button onClick={handleCreateSubscription} disabled={disabled}>
         Подписаться
      </Button>
   );
};
