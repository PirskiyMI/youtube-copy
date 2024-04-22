import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { VideoPreview, VideoPreviewSkeleton } from 'src/entities/video/video-preview';
import { VideoPreviewList } from 'src/entities/video/video-preview-list';
import { formatVideoDetails } from 'src/entities/video/video-details';
import { formatVideoDuration } from 'src/entities/video/video-details/lib/helpers';

import styles from './styles.module.scss';
import { VideoListItem } from '../model/slice';

interface Props {
   loading: boolean;
   videoList: VideoListItem[];
   handelInView: (inView: boolean) => void;
}

export const FavoriteVideoList: FC<Props> = ({ loading, videoList, handelInView }) => {
   const { ref, inView } = useInView();

   useEffect(() => {
      handelInView(inView);
   }, [handelInView, inView]);

   return (
      <section className={styles.clips}>
         <VideoPreviewList>
            {videoList.map(({ id, viewCount, duration, publishedAt, ...el }, index, array) => (
               <li ref={index === array.length - 1 ? ref : null} key={id}>
                  <Link to={`/watch/${id}`}>
                     <VideoPreview
                        duration={formatVideoDuration(duration)}
                        {...formatVideoDetails({ viewCount, publishedAt })}
                        {...el}
                     />
                  </Link>
               </li>
            ))}
            {loading &&
               [...new Array(8)].map((_, index) => (
                  <li key={index}>
                     <VideoPreviewSkeleton />
                  </li>
               ))}
         </VideoPreviewList>
      </section>
   );
};
