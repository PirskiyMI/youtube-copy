import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Video } from 'src/entities/video';
import { VideoDescription } from 'src/widgets/video-description';
//import { RelatedVideoList } from 'src/widgets/related-video';
//import { VideoComment } from 'src/widgets/video-comment';

import styles from './styles.module.scss';

export const ViewPage: FC = () => {
   const { id } = useParams();

   return (
      <div className={styles.page}>
         <div className={styles.page__main}>
            <Video src={`https://www.youtube.com/embed/${id}`} />
            <VideoDescription id={id!} />
            {/* <VideoComment videoId={id!} /> */}
         </div>
         <div>{/* <RelatedVideoList videoId={id!} /> */}</div>
      </div>
   );
};
