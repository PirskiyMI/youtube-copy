import { FC, useEffect } from 'react';

import { useAppDispatch } from 'src/shared/lib/hooks';

import styles from './styles.module.scss';
import { videoPlayerActions } from '../model';

interface Props {
   src: string;
}

export const VideoPlayer: FC<Props> = ({ src }) => {
   const { setVideoId } = videoPlayerActions;
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(setVideoId(src));
   }, [src, dispatch]);

   return (
      <div className={styles.video}>
         <iframe
            className={styles.video__iframe}
            src={src}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
         />
      </div>
   );
};
