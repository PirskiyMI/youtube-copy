import { FC } from 'react';
import styles from './styles.module.scss';

interface Props {
   image?: string;
}

export const Avatar: FC<Props> = ({ image }) => {
   if (!image) return <div className={styles.avatar}></div>;

   return <img src={image} alt="Иконка пользователя" className={styles.avatar} />;
};
