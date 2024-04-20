import { FC, Suspense } from 'react';

import { useAppSelector } from 'src/shared/lib/hooks';
import { getIsAuth } from 'src/entities/user';
import { LogIn } from 'src/features/auth/log-in';
import { FavoriteVideoList } from 'src/widgets/favorite-videos';

import styles from './styles.module.scss';

export const FavoritesPage: FC = () => {
   const isAuth = useAppSelector(getIsAuth);

   return (
      <Suspense>
         {!isAuth ? (
            <div className={styles.page}>
               <div className={styles.page__content}>
                  <h2 className={styles.page__title}>Войдите в аккаунт</h2>
                  <p>Тогда в этом разделе появятся видео, которые вам понравились.</p>
                  <LogIn />
               </div>
            </div>
         ) : (
            <div className={styles.page}>
               <FavoriteVideoList />
            </div>
         )}
      </Suspense>
   );
};
