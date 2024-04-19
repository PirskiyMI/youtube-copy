import { FC } from 'react';

import { useAppSelector } from 'src/shared/lib/hooks';
import { getIsAuth } from 'src/entities/user';
import { LogIn } from 'src/features/auth/log-in';
import { FavoriteVideoList } from 'src/widgets/favorite-videos';

import styles from './styles.module.scss';

export const FavoritesPage: FC = () => {
   const isAuth = useAppSelector(getIsAuth);

   if (!isAuth) {
      return (
         <div className={styles.page}>
            <div className={styles.page__content}>
               <h2 className={styles.page__title}>Войдите в аккаунт</h2>
               <p>Тогда в этом разделе появятся видео, которые вам понравились.</p>
               <LogIn />
            </div>
         </div>
      );
   }

   return (
      <div>
         <FavoriteVideoList />
      </div>
   );
};
