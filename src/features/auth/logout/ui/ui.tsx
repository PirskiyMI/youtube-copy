import { FC, ReactNode } from 'react';

interface Props {
   children: ReactNode;
   handleLogOut: () => void;
}

export const Logout: FC<Props> = ({ children, handleLogOut }) => {
   return <div onClick={handleLogOut}>{children}</div>;
};
