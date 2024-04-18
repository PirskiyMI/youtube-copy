import { FC } from 'react';
import styles from './styles.module.scss';

interface IProps {
   src: string;
}

export const Video: FC<IProps> = ({ src }) => {
   return (
      <div className={styles.video}>
         <iframe src={src} allowFullScreen className={styles.video__iframe} allow="autoplay" />
      </div>
   );
};
