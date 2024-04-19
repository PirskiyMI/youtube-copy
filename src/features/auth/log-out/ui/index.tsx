import { useAppDispatch } from 'src/shared/lib/hooks';
import { Button } from 'src/shared/ui/button';
import { userActions } from 'src/entities/user';

export const LogOut = () => {
   const dispatch = useAppDispatch();
   const { clearUser } = userActions;

   const handleLogOut = () => {
      dispatch(clearUser());
      localStorage.removeItem('access-token');
      localStorage.removeItem('user');
   };

   return <Button onClick={handleLogOut}>Выйти</Button>;
};
