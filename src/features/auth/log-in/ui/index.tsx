import { Auth } from 'src/entities/user/api/auth';
import { Button, useAppDispatch } from 'src/shared';

export const LogIn = () => {
   const dispatch = useAppDispatch();

   const handleLogin = async () => {
      dispatch(Auth());
   };

   return <Button onClick={handleLogin}>Войти</Button>;
};
