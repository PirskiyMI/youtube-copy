import { FC, ReactNode } from 'react';

import styles from './styles.module.scss';

interface Props {
   title: string;
   text: string;
   hidePopup: () => void;
   button?: ReactNode;
}

export const Popup: FC<Props> = ({ title, text, hidePopup, button }) => {
   return (
      <div className={styles.popup}>
         <div className={styles.popup__backdrop} onClick={hidePopup} />
         <div className={styles.popup__body}>
            <div className={styles.popup__text}>
               <p>{title}</p>
               <p>{text}</p>
            </div>
            {button && <div className={styles.popup__button}>{button}</div>}
         </div>
      </div>
   );
};
