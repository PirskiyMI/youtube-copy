import { FC, ReactNode } from 'react';

import { usePopup } from 'src/shared/lib/hooks';
import { Button } from 'src/shared/ui/button';
import { Popup } from 'src/shared/ui/popup';

import styles from './styles.module.scss';

interface Props {
   authButton: ReactNode;
}

export const AddSubscribeUnauthorized: FC<Props> = ({ authButton }) => {
   const { isPopupVisible, showPopup, hidePopup } = usePopup();

   return (
      <div className={styles.button}>
         <Button onClick={showPopup}>Подписаться</Button>
         {isPopupVisible && (
            <Popup
               title="Хотите подписаться на этот канал?"
               text="Тогда войдите в аккаунт."
               hidePopup={hidePopup}
               button={authButton}
            />
         )}
      </div>
   );
};
