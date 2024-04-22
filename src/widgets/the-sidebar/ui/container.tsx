import { FC } from 'react';

import { useAppSelector } from 'src/shared/lib/hooks';
import { getIsAuth } from 'src/entities/user';

import { TheSidebar } from './ui';

export const TheSidebarContainer: FC = () => {
   const isAuth = useAppSelector(getIsAuth);

   return <TheSidebar isAuth={isAuth} />;
};
