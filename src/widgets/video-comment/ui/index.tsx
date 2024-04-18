import { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Comment, fetchComment } from 'src/entities/comment';
import { useAppDispatch, useAppSelector } from 'src/shared';
import { getVideoCommentSelector } from '../model/selectors';
import { videoCommentActions } from '../model/reducers';

import styles from './styles.module.scss';
import { CommentForm } from 'src/features/send-comment/ui';

interface IProps {
   videoId: string;
}

export const VideoComment: FC<IProps> = ({ videoId }) => {
   const {
      data: { commentList, nextPageToken },
   } = useAppSelector(getVideoCommentSelector);
   const { clearCommentList } = videoCommentActions;
   const { ref, inView } = useInView({ threshold: 0.9 });
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (inView) {
         dispatch(fetchComment({ videoId, token: nextPageToken, maxResults: 20 }));
      }
   }, [inView]);

   useEffect(() => {
      dispatch(fetchComment({ videoId, token: nextPageToken, maxResults: 40 }));
      return () => {
         dispatch(clearCommentList());
      };
   }, []);

   return (
      <>
         <CommentForm videoId={videoId} />
         <ul className={styles.list}>
            {commentList.map((el, index, array) => {
               if (index === array.length - 1) {
                  return (
                     <li ref={ref} key={el.id}>
                        <Comment {...el} />
                     </li>
                  );
               }
               return (
                  <li key={el.id}>
                     <Comment {...el} />
                  </li>
               );
            })}
         </ul>
      </>
   );
};
