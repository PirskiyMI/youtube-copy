import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './styles.module.scss';
import { navList } from '../constants/nav-list';

export const TheSidebar: FC = () => {
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
            </ul>
         </nav>
      </aside>
   );
};
