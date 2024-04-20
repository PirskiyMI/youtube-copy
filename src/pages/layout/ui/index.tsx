import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { ScrollToTop } from 'src/shared/ui/scroll-to-top';
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
            <Suspense>
               <Outlet />
            </Suspense>
         </main>
      </div>
   );
};
