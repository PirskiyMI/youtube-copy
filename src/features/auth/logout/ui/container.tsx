import { FC, ReactNode } from 'react';

import { useAppDispatch } from 'src/shared/lib/hooks';
import { userActions } from 'src/entities/user';

import { Logout } from './ui';

interface Props {
   children: ReactNode;
}

export const LogoutContainer: FC<Props> = ({ children }) => {
   const dispatch = useAppDispatch();
   const { clearUser } = userActions;

   const handleLogOut = () => {
      dispatch(clearUser());
   };

   return <Logout handleLogOut={handleLogOut}>{children}</Logout>;
};
