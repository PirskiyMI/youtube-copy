import { FC } from 'react';
import { Link } from 'react-router-dom';

import { VideoBySearchPreview } from 'src/entities/video/video-by-search-preview';
import { formatVideoDetails, formatVideoDuration } from 'src/entities/video/video-details';

import styles from './styles.module.scss';
import { VideoListItem } from '../model/slice';

interface Props {
   videoList: VideoListItem[];
}

export const VideoListBySearch: FC<Props> = ({ videoList }) => {
   return (
      <ul className={styles.list}>
         {videoList.map(({ id, duration, publishedAt, viewCount, ...el }) => (
            <li key={id}>
               <Link to={`/watch/${id}`}>
                  <VideoBySearchPreview
                     duration={formatVideoDuration(duration)}
                     {...formatVideoDetails({ publishedAt, viewCount })}
                     {...el}
                  />
               </Link>
            </li>
         ))}
      </ul>
   );
};
