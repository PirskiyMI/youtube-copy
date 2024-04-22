import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { VideoPreviewShort } from 'src/entities/video/video-preview-related';

import styles from './styles.module.scss';
import { VideoListItem } from '../model/slice';
import { formatVideoDetails, formatVideoDuration } from 'src/entities/video/video-details';

interface Props {
   videoList: VideoListItem[];
}

export const RelatedVideoList: FC<Props> = memo(({ videoList }) => {
   return (
      <ul className={styles.list}>
         {videoList.map(({ id, duration, publishedAt, viewCount, ...el }) => (
            <li key={id} className={styles.list__item}>
               <Link to={`/watch/${id}`}>
                  <VideoPreviewShort
                     duration={formatVideoDuration(duration)}
                     {...formatVideoDetails({ publishedAt, viewCount })}
                     {...el}
                  />
               </Link>
            </li>
         ))}
      </ul>
   );
});
