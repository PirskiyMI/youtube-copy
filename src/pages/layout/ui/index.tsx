import { Outlet } from 'react-router-dom';
import { TheHeader } from 'src/widgets/header';
import styles from './styles.module.scss';
import { ScrollToTop } from 'src/shared';

export const Layout = () => {
   return (
      <div className={styles.layout}>
         <ScrollToTop />
         <TheHeader />
         <main className={styles.layout__main}>
            <Outlet />
         </main>
      </div>
   );
};
