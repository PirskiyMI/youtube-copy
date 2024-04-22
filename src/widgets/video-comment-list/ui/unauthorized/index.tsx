import { FC } from 'react';

import { Login } from 'src/features/auth/login';

import styles from './styles.module.scss';

export const CommentFormUnauthorized: FC = () => {
   return (
      <div className={styles.form}>
         <h3 className={styles.from__title}>
            Чтобы оставить комментарий к этому видео, войдите в аккаунт
         </h3>
         <Login />
      </div>
   );
};
