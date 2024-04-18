import { FC } from 'react';
import LogoIcon from './../../lib/assets/images/logo.svg?react';
import styles from './styles.module.scss';

export const Logo: FC = () => {
   return <LogoIcon className={styles.logo} />;
};
