import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from 'src/shared/lib/hooks';
import { Path } from 'src/shared/constants';
import { Logo } from 'src/shared/ui/logo';
import { Avatar } from 'src/shared/ui/avatar';
import { getUser } from 'src/entities/user/model/selectors';
import { SearchForm } from 'src/features/search-form';
import { Login } from 'src/features/auth/login';

import styles from './styles.module.scss';

export const TheHeader: FC = () => {
   const user = useAppSelector(getUser);

   return (
      <header className={styles.header}>
         <Link to={Path.HOME_PAGE}>
            <Logo />
         </Link>
         <SearchForm />
         {user ? <Avatar image={user?.imgURL} /> : <Login />}
      </header>
   );
};
