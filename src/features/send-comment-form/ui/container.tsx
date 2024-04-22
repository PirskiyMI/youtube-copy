import { FC, useEffect, useState } from 'react';
import { SendCommentForm } from './ui';
import { useAppDispatch } from 'src/shared/lib/hooks';
import { addComment } from '../api';

interface Props {
   videoId: string;
}

export const SendCommentFormContainer: FC<Props> = ({ videoId }) => {
   const [isFetching, setIsFetching] = useState(false);
   const [commentText, setCommentText] = useState('');
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (isFetching) {
         dispatch(addComment({ videoId, text: commentText }));
         setCommentText('');
         setIsFetching(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch, isFetching]);

   return (
      <SendCommentForm
         commentText={commentText}
         setCommentText={setCommentText}
         setIsFetching={setIsFetching}
      />
   );
};
