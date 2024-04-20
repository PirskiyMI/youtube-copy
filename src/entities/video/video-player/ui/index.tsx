import { FC, useEffect } from 'react';

import { useAppDispatch } from 'src/shared/lib/hooks';

import styles from './styles.module.scss';
import { videoPlayerActions } from '../model';

interface IProps {
   src: string;
}

export const VideoPlayer: FC<IProps> = ({ src }) => {
   const { setVideoId } = videoPlayerActions;
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(setVideoId(src));
   }, [src, dispatch]);

   return (
      <div className={styles.video}>
         <iframe src={src} allowFullScreen className={styles.video__iframe} allow="autoplay" />
      </div>
   );
};
