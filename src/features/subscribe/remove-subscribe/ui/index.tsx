import { FC } from 'react';

import { Button, useAppDispatch } from 'src/shared';
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
