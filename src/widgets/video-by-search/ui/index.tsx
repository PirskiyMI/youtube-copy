import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';

import styles from './styles.module.scss';
import { fetchVideoBySearch } from '../model/thunks';
import { VideoPreviewSearch } from 'src/entities/video/video-preview-search';

interface Props {
   searchValue: string;
}

export const VideoBySearch: FC<Props> = ({ searchValue }) => {
   const videoList = useAppSelector((state) => state.videoBySearch.videoList);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(fetchVideoBySearch(searchValue));
   }, [searchValue, dispatch]);

   return (
      <ul className={styles.list}>
         {videoList.length &&
            videoList.map(({ id, ...el }) => (
               <li key={id}>
                  <Link to={`/watch/${id}`}>
                     <VideoPreviewSearch {...el} />
                  </Link>
               </li>
            ))}
      </ul>
   );
};
