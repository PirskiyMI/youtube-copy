import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Logout } from 'src/features/auth/logout';

import styles from './styles.module.scss';
import { navList } from '../constants/nav-list';
import LogoutIcon from '../assets/logout-icon.svg?react';

interface Props {
   isAuth: boolean;
}

export const TheSidebar: FC<Props> = ({ isAuth }) => {
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
                     <Logout>
                        <div className={styles.sidebar__link}>
                           <span className={styles.sidebar__icon}>
                              <LogoutIcon />
                           </span>
                           <span>Выйти</span>
                        </div>
                     </Logout>
                  </li>
               )}
            </ul>
         </nav>
      </aside>
   );
};
