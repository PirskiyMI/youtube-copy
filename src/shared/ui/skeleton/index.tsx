import { FC } from 'react';
import styles from './styles.module.scss';

interface Props {
   className: string;
}

export const Skeleton: FC<Props> = ({ className }) => {
   const classes = `${styles.skeleton} ${className}`;

   return <div className={classes} />;
};
