import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { VideoPlayer } from 'src/entities/video/video-player';
import { VideoDescription } from 'src/widgets/video-description';
//import { RelatedVideoList } from 'src/widgets/related-video-list';
//import { VideoCommentList } from 'src/widgets/video-comment-list';

import styles from './styles.module.scss';

export const ViewPage: FC = () => {
   const { id } = useParams();

   return (
      <div className={styles.page}>
         <div className={styles.page__main}>
            <VideoPlayer src={`https://www.youtube.com/embed/${id}`} />
            <VideoDescription videoId={id!} />
            {/* <VideoCommentList videoId={id!} /> */}
         </div>
         <div>{/* <RelatedVideoList /> */}</div>
      </div>
   );
};
