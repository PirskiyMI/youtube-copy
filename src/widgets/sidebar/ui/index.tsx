import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAppSelector } from 'src/shared/lib/hooks';
import { getIsAuth } from 'src/entities/user';
import { LogOut } from 'src/features/auth/log-out';

import styles from './styles.module.scss';
import { navList } from '../constants/nav-list';
import LogoutIcon from '../assets/logout-icon.svg?react';

export const TheSidebar: FC = () => {
   const isAuth = useAppSelector(getIsAuth);
   const { pathname } = useLocation();

   return (
      <aside className={styles.sidebar}>
         <nav className={styles.sidebar__nav}>
            <ul className={styles.sidebar__list}>
               {navList.map((el) => (
                  <li key={el.title} className={styles.sidebar__item}>
                     <Link
                        to={el.path}
                        className={
                           styles.sidebar__link +
                           (el.path === pathname ? ` ${styles.sidebar__link_active}` : '')
                        }>
                        <span className={styles.sidebar__icon}>{el.icon}</span>
                        <span>{el.title}</span>
                     </Link>
                  </li>
               ))}
               {isAuth && (
                  <li className={styles.sidebar__item}>
                     <LogOut>
                        <div className={styles.sidebar__link}>
                           <span className={styles.sidebar__icon}>
                              <LogoutIcon />
                           </span>
                           <span>Выйти</span>
                        </div>
                     </LogOut>
                  </li>
               )}
            </ul>
         </nav>
      </aside>
   );
};
