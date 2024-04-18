import { Outlet } from 'react-router-dom';

import { ScrollToTop } from 'src/shared';
import { TheHeader } from 'src/widgets/header';
import { TheSidebar } from 'src/widgets/sidebar';

import styles from './styles.module.scss';

export const Layout = () => {
   return (
      <div className={styles.layout}>
         <ScrollToTop />
         <TheHeader />
         <TheSidebar />
         <main className={styles.layout__main}>
            <Outlet />
         </main>
      </div>
   );
};
