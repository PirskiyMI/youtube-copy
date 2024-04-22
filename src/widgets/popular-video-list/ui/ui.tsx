import { FC, memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { VideoPreview, VideoPreviewSkeleton } from 'src/entities/video/video-preview';
import { VideoPreviewList } from 'src/entities/video/video-preview-list';
import { formatVideoDetails } from 'src/entities/video/video-details';
import { formatVideoDuration } from 'src/entities/video/video-details/lib/helpers';

import { VideoListItem } from '../model/slice';

interface Props {
   loading: boolean;
   videoList: VideoListItem[];
   handleInView: (inView: boolean) => void;
}

export const PopularVideoList: FC<Props> = memo(({ loading, videoList, handleInView }) => {
   const { ref, inView } = useInView({ threshold: 0.9 });

   useEffect(() => {
      handleInView(inView);
   }, [inView]);

   return (
      <section>
         <VideoPreviewList>
            {videoList.map(({ id, duration, publishedAt, viewCount, ...el }, index, array) => (
               <li ref={index === array.length - 1 ? ref : null} key={id}>
                  <Link to={`/watch/${id}`}>
                     <VideoPreview
                        duration={formatVideoDuration(duration)}
                        {...formatVideoDetails({ publishedAt, viewCount })}
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
});
