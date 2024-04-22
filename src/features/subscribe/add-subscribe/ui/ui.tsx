import { FC } from 'react';

import { Button } from 'src/shared/ui/button';

interface Props {
   disabled: boolean;
   handleCreateSubscription: () => void;
}

export const AddSubscribe: FC<Props> = ({ disabled, handleCreateSubscription }) => {
   return (
      <Button onClick={handleCreateSubscription} disabled={disabled}>
         Подписаться
      </Button>
   );
};
