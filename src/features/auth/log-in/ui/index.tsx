import { useAppDispatch } from 'src/shared/lib/hooks';
import { Button } from 'src/shared/ui/button';
import { Auth } from 'src/entities/user';

export const LogIn = () => {
   const dispatch = useAppDispatch();

   const handleLogin = async () => {
      dispatch(Auth());
   };

   return <Button onClick={handleLogin}>Войти</Button>;
};
