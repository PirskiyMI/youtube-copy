import { FC } from 'react';
import styles from './styles.module.scss';

interface IProps {
   image?: string;
}

export const Avatar: FC<IProps> = ({ image }) => {
   if (!image) return <div className={styles.avatar}></div>;

   return <img src={image} alt="Иконка пользователя" className={styles.avatar} />;
};
