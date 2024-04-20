import { FC, ReactNode } from 'react';

import { useAppDispatch } from 'src/shared/lib/hooks';
import { userActions } from 'src/entities/user';

interface Props {
   children: ReactNode;
}

export const LogOut: FC<Props> = ({ children }) => {
   const dispatch = useAppDispatch();
   const { clearUser } = userActions;

   const handleLogOut = () => {
      dispatch(clearUser());
   };

   return <div onClick={handleLogOut}>{children}</div>;
};
