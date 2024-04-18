import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'src/shared';
import { VideoPreviewSearch, isVideoIdString } from 'src/entities/video';

import styles from './styles.module.scss';
import { fetchVideoBySearch } from '../api/fetch-video-by-search';

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
            videoList.map((el) => (
               <li key={isVideoIdString(el.id) ? el.id : el.id.videoId}>
                  <Link to={`/watch/${isVideoIdString(el.id) ? el.id : el.id.videoId}`}>
                     <VideoPreviewSearch {...el} />
                  </Link>
               </li>
            ))}
      </ul>
   );
};
