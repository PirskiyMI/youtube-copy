import { FC, memo } from 'react';

import SearchIcon from './../../assets/search-icon.svg?react';
import styles from './styles.module.scss';

export const SearchFormButton: FC = memo(() => {
   return (
      <button type="submit" className={styles.button} aria-label="Введите запрос">
         <SearchIcon className={styles.button__icon} />
      </button>
   );
});
