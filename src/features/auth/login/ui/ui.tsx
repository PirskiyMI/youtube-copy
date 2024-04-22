import { FC } from 'react';
import { Button } from 'src/shared/ui/button';

interface Props {
   handleLogin: () => void;
}

export const Login: FC<Props> = ({ handleLogin }) => {
   return <Button onClick={handleLogin}>Войти</Button>;
};
