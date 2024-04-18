import { FC } from 'react';

import { Chips } from 'src/features/chips';
import { Sidebar } from 'src/widgets/sidebar';
import { PopularVideoList } from 'src/widgets/popular-video';

import styles from './styles.module.scss';

export const HomePage: FC = () => {
   return (
      <>
         <Sidebar />
         <div className={styles.home}>
            <Chips />
            <PopularVideoList />
         </div>
      </>
   );
};
