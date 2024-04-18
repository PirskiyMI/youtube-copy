import { FC } from 'react';

import { PopularVideoList } from 'src/widgets/popular-video';

import styles from './styles.module.scss';

export const HomePage: FC = () => {
   return (
      <>
         <div className={styles.home}>
            <PopularVideoList />
         </div>
      </>
   );
};
