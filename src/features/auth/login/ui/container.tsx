import { FC } from 'react';

import { useAppDispatch } from 'src/shared/lib/hooks';
import { Auth } from 'src/entities/user';

import { Login } from './ui';

export const LoginContainer: FC = () => {
   const dispatch = useAppDispatch();

   const handleLogin = async () => {
      dispatch(Auth());
   };

   return <Login handleLogin={handleLogin} />;
};
