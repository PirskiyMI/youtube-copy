import { FC, HTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss';

interface IProps extends HTMLAttributes<HTMLButtonElement> {
   children: ReactNode;
   className?: string;
   disabled?: boolean;
}

export const Button: FC<IProps> = ({ className, children, disabled, ...props }) => {
   const classes = className ? `${className} ${styles.button}` : styles.button;
   return (
      <button disabled={disabled} {...props} className={classes}>
         {children}
      </button>
   );
};
