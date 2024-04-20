import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { useAppDispatch } from 'src/shared/lib/hooks';
import { Preloader } from 'src/shared/ui/preloader';
import { VideoPreview } from 'src/entities/video/video-preview';
import { VideoPreviewList } from 'src/entities/video/video-preview-list';
import { formatVideoDetails } from 'src/entities/video/video-details';
import { formatVideoDuration } from 'src/entities/video/video-details/lib/helpers';

import styles from './styles.module.scss';
import { fetchPopularVideo } from '../model/thunks';
import { VideoListItem } from '../model/slice';

interface Props {
   loading: boolean;
   videoList: VideoListItem[];
}

export const PopularVideoList: FC<Props> = ({ loading, videoList }) => {
   const { ref, inView } = useInView();
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (inView && videoList.length < 50) {
         dispatch(fetchPopularVideo({ maxResults: 10 }));
      }
   }, [inView]);

   return (
      <section className={styles.clips}>
         <VideoPreviewList>
            {videoList.map(({ id, duration, publishedAt, viewCount, ...el }, index, array) => (
               <li
                  ref={index === array.length - 1 ? ref : null}
                  key={id}
                  className={styles.clips__item}>
                  <Link to={`/watch/${id}`}>
                     <VideoPreview
                        duration={formatVideoDuration(duration)}
                        {...formatVideoDetails({ publishedAt, viewCount })}
                        {...el}
                     />
                  </Link>
               </li>
            ))}
         </VideoPreviewList>
         {loading && (
            <div className={styles.clips__preloader}>
               <Preloader />
            </div>
         )}
      </section>
   );
};
