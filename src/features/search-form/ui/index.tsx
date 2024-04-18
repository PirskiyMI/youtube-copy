import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import { ClearFormButton } from './clear-form-button';
import { SearchFormButton } from './search-form-button';

export const SearchForm: FC = () => {
   const [searchValue, setSearchValue] = useState<string>('');
   const navigate = useNavigate();
   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newSearchValue = searchValue.split(' ').join('+');
      navigate(`/search/${newSearchValue}`);
   };

   const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
   };

   const clearSearch = useCallback(() => setSearchValue(''), []);

   return (
      <form onSubmit={onSubmit} className={styles.form}>
         <div className={styles.form__wrapper}>
            <input
               value={searchValue}
               onChange={onSearchChange}
               placeholder="Введите запрос"
               className={styles.form__field}
            />
            {searchValue ? <ClearFormButton onClick={clearSearch} /> : null}
         </div>

         <SearchFormButton />
      </form>
   );
};
