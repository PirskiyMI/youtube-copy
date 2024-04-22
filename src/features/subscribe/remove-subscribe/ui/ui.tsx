import { FC } from 'react';

import { Button } from 'src/shared/ui/button';

import styles from './styles.module.scss';

interface Props {
   handleDeleteSubscription: () => void;
}

export const RemoveSubscribe: FC<Props> = ({ handleDeleteSubscription }) => {
   return (
      <Button onClick={handleDeleteSubscription} className={styles.button}>
         Отменить подписку
      </Button>
   );
};
