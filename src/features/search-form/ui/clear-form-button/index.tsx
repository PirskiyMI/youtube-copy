import { FC, memo } from 'react';

import CrossIcon from './../../assets/cross-icon.svg?react';
import styles from './styles.module.scss';

interface IProps {
   onClick: () => void;
}

export const ClearFormButton: FC<IProps> = memo(({ onClick }) => {
   return (
      <button type='reset' className={styles.button} onClick={onClick}>
         <CrossIcon />
      </button>
   );
});
