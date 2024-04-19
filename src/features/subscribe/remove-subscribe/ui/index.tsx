import { FC } from 'react';

import { useAppDispatch } from 'src/shared/lib/hooks';
import { Button } from 'src/shared/ui/button';
import { channelActions, deleteSubscription } from 'src/entities/channel';

import styles from './styles.module.scss';

interface Props {
   subscribeStatus: string;
}

export const RemoveSubscribe: FC<Props> = ({ subscribeStatus }) => {
   const { clearSubscriptionStatus } = channelActions;
   const dispatch = useAppDispatch();
   const handleDeleteSubscription = () => {
      dispatch(deleteSubscription(subscribeStatus));
      dispatch(clearSubscriptionStatus());
   };
   return (
      <Button onClick={handleDeleteSubscription} className={styles.button}>
         Отменить подписку
      </Button>
   );
};
