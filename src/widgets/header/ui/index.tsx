import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, Logo, Path, useAppSelector } from 'src/shared';
import { getUser } from 'src/entities/user/model/selectors';
import { SearchForm } from 'src/features/search-form';
import { LogIn } from 'src/features/auth/log-in';
import { LogOut } from 'src/features/auth/log-out';

import styles from './styles.module.scss';

export const TheHeader: FC = () => {
   const user = useAppSelector(getUser);

   return (
      <header className={styles.header}>
         <div className={styles.header__label}>
            <Link to={Path.HOME_PAGE}>
               <Logo />
            </Link>
         </div>
         <SearchForm />

         {user ? (
            <div className={styles.header__user}>
               <Avatar image={user?.imgURL} />
               <LogOut />
            </div>
         ) : (
            <LogIn />
         )}
      </header>
   );
};
