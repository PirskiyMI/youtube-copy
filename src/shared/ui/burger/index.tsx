import { FC } from 'react';
import styles from './styles.module.scss';

interface IProps {
   onClick: () => void;
}

export const Burger: FC<IProps> = ({ onClick }) => {
   return (
      <div onClick={onClick} className={styles.burger}>
         <div className={styles.burger__body}>
            <span className={styles.burger__line}></span>
            <span className={styles.burger__line}></span>
            <span className={styles.burger__line}></span>
         </div>
      </div>
   );
};
