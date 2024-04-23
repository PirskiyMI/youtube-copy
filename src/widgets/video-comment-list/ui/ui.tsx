import { FC, Suspense, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAppDispatch } from 'src/shared/lib/hooks';
import { Preloader } from 'src/shared/ui/preloader';
import { Comment, TopLevelCommentProps } from 'src/entities/comment';
import { SendCommentForm } from 'src/features/send-comment-form';

import styles from './styles.module.scss';
import { CommentFormUnauthorized } from './unauthorized';
import { fetchComment } from '../model/thunks';

interface Props {
   videoId: string;
   nextPageToken: string;
   loading: boolean;
   isAuth: boolean;
   commentList: TopLevelCommentProps[];
}

export const VideoCommentList: FC<Props> = ({
   videoId,
   nextPageToken,
   loading,
   isAuth,
   commentList,
}) => {
   const { ref, inView } = useInView({ threshold: 0.9 });
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (inView) {
         dispatch(fetchComment({ videoId, token: nextPageToken, maxResults: 20 }));
      }
   }, [inView]);

   return (
      <>
         <Suspense>
            {isAuth ? <SendCommentForm videoId={videoId} /> : <CommentFormUnauthorized />}
         </Suspense>
         <ul className={styles.list}>
            {commentList.map((el, index, array) => (
               <li ref={index === array.length - 1 ? ref : null} key={el.id}>
                  <Comment {...el} />
               </li>
            ))}
         </ul>
         {loading && (
            <div className={styles.preloader}>
               <Preloader />
            </div>
         )}
      </>
   );
};
